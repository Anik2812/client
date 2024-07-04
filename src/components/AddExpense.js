// src/components/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';

const AddExpense = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(['Food', 'Transportation', 'Entertainment', 'Others']);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (category === 'Others' && newCategory) {
      setCategory(newCategory);
    }

    if (!description || !amount || !category) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/expenses', { description, amount, category }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setSuccess('Expense added successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add expense.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Expense
      </Typography>
      <form onSubmit={handleAddExpense}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {category === 'Others' && (
          <TextField
            label="New Category"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            margin="normal"
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Expense
        </Button>
      </form>
      {error && <Snackbar open={true} autoHideDuration={6000}><Alert severity="error">{error}</Alert></Snackbar>}
      {success && <Snackbar open={true} autoHideDuration={6000}><Alert severity="success">{success}</Alert></Snackbar>}
    </Container>
  );
};

export default AddExpense;
