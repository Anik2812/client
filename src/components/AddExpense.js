import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    category: ''
  });
  const navigate = useNavigate();

  const { description, amount, category } = expense;

  const onChange = e => setExpense({ ...expense, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      await axios.post('http://localhost:5000/api/expenses', expense, config);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Description" name="description" value={description} onChange={onChange} required />
      <input type="number" placeholder="Amount" name="amount" value={amount} onChange={onChange} required />
      <input type="text" placeholder="Category" name="category" value={category} onChange={onChange} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;