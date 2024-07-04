import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Paper, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [otherCategory, setOtherCategory] = useState('');
  
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === 'Other') {
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleOtherCategoryChange = (e) => {
    setOtherCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = category === 'Other' ? otherCategory : category;

    const expense = {
      description,
      amount,
      category: newCategory,
    };

    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };

    try {
      await axios.post('http://localhost:5000/api/expenses', expense, config);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Expense
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {category === 'Other' && (
            <Box mb={2}>
              <TextField
                label="Please specify"
                value={otherCategory}
                onChange={handleOtherCategoryChange}
                fullWidth
              />
            </Box>
          )}
          
          
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save Expense
            </Button>
          </Box>
        </form>
      </Paper>

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
              // Set the specified other category
              setCategory(otherCategory);
              handleDialogClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddExpense;
