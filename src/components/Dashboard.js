import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container, Typography, Button, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Paper, Box, Grid, useTheme
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, TrendingUp } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#bb86fc', '#03dac6', '#cf6679', '#ff7597', '#70efde'];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [ExpenseChartData, setChartData] = useState([]);
  const theme = useTheme(); // Use the theme hook here

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
    setChartData(data);
  }, [expenses]);

  const [editingExpense, setEditingExpense] = useState(null);

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
    } catch (err) {
      console.error('Error deleting expense:', err.response ? err.response.data : err.message);
      console.error('Full error object:', err);
    }
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
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
                    <Legend />
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
                          <IconButton edge="end" aria-label="edit" sx={{ color: theme.palette.secondary.main }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => deleteExpense(expense._id)} sx={{ color: theme.palette.error.main }}>
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
      </motion.div>
    </Container>
  );
};

export default Dashboard;
