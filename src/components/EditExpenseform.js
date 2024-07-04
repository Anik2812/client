import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditExpenseForm = ({ expense, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState(expense);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const res = await axios.put(`http://localhost:5000/api/expenses/${expense._id}`, formData, config);
      onUpdate(res.data);
    } catch (err) {
      console.error('Error updating expense:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditExpenseForm;