import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container, Typography, Button, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Paper, TextField, Select,
  MenuItem, FormControl, InputLabel, Box, Grid, Chip, useTheme
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, AccountBalance } from '@mui/icons-material';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '', period: 'monthly' });
  const theme = useTheme();
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      const res = await axios.get('http://localhost:5000/api/budgets', config);
      setBudgets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      await axios.post('http://localhost:5000/api/budgets', newBudget, config);
      setNewBudget({ category: '', amount: '', period: 'monthly' });
      fetchBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBudget = async (id) => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`, config);
      fetchBudgets();
    } catch (err) {
      console.error('Error deleting budget:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{
          opacity: 0, y: 50
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300, display: 'flex', alignItems: 'center' }}>
            <AccountBalance sx={{ mr: 2 }} /> Budget Planner
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Add New Budget
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    name="category"
                    label="Category"
                    value={newBudget.category}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="amount"
                    label="Amount"
                    type="number"
                    value={newBudget.amount}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="period-label">Period</InputLabel>
                    <Select
                      labelId="period-label"
                      name="period"
                      value={newBudget.period}
                      onChange={handleInputChange}
                      label="Period"
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                  <Button type="submit" variant="contained" color="secondary" startIcon={<AddIcon />} size="large">
                    Add Budget
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Current Budgets
              </Typography>
              <List>
                <AnimatePresence>
                  {budgets.map(budget => (
                    <motion.div
                      key={budget._id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem>
                        <ListItemText
                          primary={budget.category}
                          secondary={
                            <Typography variant="body2" color="textSecondary">
                              ${budget.amount}
                              <Chip
                                label={budget.period}
                                size="small"
                                sx={{ ml: 1, backgroundColor: theme.palette.primary.main }}
                              />
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={() => deleteBudget(budget._id)} sx={{ color: theme.palette.error.main }}>
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

export default Budget;
