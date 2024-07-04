import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, Snackbar, Alert
} from '@mui/material';

const EditExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/expenses/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });
        const expense = res.data;
        setDescription(expense.description);
        setAmount(expense.amount);
        setCategory(expense.category);
      } catch (err) {
        console.error('Error fetching expense:', err);
        setError('Failed to fetch expense details.');
      }
    };
    fetchExpense();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/expenses/${id}`, {
        description,
        amount,
        category
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      setSuccess('Expense updated successfully!');
      navigate('/');
    } catch (err) {
      setError('Failed to update expense.');
      console.error('Error updating expense:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Expense
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Expense
          </Button>
        </form>
      </Box>

      {error && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error">{error}</Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccess('')}>
          <Alert onClose={() => setSuccess('')} severity="success">{success}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditExpense;
