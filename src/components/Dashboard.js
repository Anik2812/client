import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, Typography, Button, List, ListItem, ListItemText, 
  ListItemSecondaryAction, IconButton, Paper, Box, Grid, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, TrendingUp } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#ff6f61', '#ffb74d', '#f06292', '#ba68c8', '#64b5f6', '#4db6ac', 
'#f9a825', '#ff7043', '#e57373', '#8e24aa', '#7b1fa2', '#f57f17', 
'#c2185b', '#9c27b0', '#ffeb3b', '#4caf50', '#2196f3', '#009688'
];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [ExpenseChartData, setChartData] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const theme = useTheme();

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const data = expenses.reduce((acc, expense) => {
      const existingCategory = acc.find(item => item.name === expense.category);
      if (existingCategory) {
        existingCategory.value += expense.amount;
      } else {
        acc.push({ name: expense.category, value: expense.amount });
      }
      return acc;
    }, []);
    console.log(data); // Log chart data to ensure all categories are included
    setChartData(data);
  }, [expenses]);
  

  const fetchExpenses = async () => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      const res = await axios.get('http://localhost:5000/api/expenses', config);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id) => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      console.log('Attempting to delete expense with ID:', id);
      const response = await axios.delete(`http://localhost:5000/api/expenses/${id}`, config);
      console.log('Delete response:', response.data);
      setExpenses(expenses.filter(expense => expense._id !== id));
      setSnackbarMessage('Expense deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error deleting expense:', err.response ? err.response.data : err.message);
      console.error('Full error object:', err);
      setSnackbarMessage('Failed to delete expense');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    // Redirect to edit page
    window.location.href = `/edit-expense/${expense._id}`;
  };

  const handleDialogOpen = (category) => {
    if (category === 'Other') {
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    // Optionally, save the 'other' category data
  };

  const handleOtherCategoryChange = (e) => {
    setOtherCategory(e.target.value);
  };

  const chartData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300 }}>
            Financial Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            component={RouterLink} 
            to="/add-expense"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Add New Expense
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', minHeight: 400 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ mr: 1 }} /> Expense Breakdown
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                      animationEasing="ease-in-out"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', color: '#fff' }} 
                      labelStyle={{ color: '#fff' }}
                      formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      iconSize={12}
                      iconType="circle"
                      wrapperStyle={{ 
                        paddingLeft: 10,
                        color: '#fff',
                        fontSize: '0.9rem',
                        backgroundColor: '#212121',
                        borderRadius: 5,
                        boxShadow: theme.shadows[2],
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      formatter={(value) => (
                        <span style={{ color: '#fff' }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', minHeight: 400 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Recent Expenses
              </Typography>
              <List>
                <AnimatePresence>
                  {expenses.slice(0, 5).map(expense => (
                    <motion.div
                      key={expense._id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem>
                        <ListItemText
                          primary={expense.description}
                          secondary={
                            <Typography variant="body2" color="textSecondary">
                              ${expense.amount} - {expense.category}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            sx={{ color: theme.palette.secondary.main }}
                            onClick={() => handleEdit(expense)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteExpense(expense._id)}
                            sx={{ color: theme.palette.error.main }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Dialog for Other Category */}
        <Dialog open={showDialog} onClose={handleDialogClose}>
          <DialogTitle>Specify Other Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Other Category"
              type="text"
              fullWidth
              value={otherCategory}
              onChange={handleOtherCategoryChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Save the 'other' category data
                setShowDialog(false);
                // Possibly update the chart data or perform other actions
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
