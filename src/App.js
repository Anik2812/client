import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import Budget from './components/Budget';
import EditExpense from './components/EditExpense';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#1e1e1e',
      default: '#121212',
    },
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    error: {
      main: '#cf6679',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  shadows: ['none', '0px 4px 6px rgba(0,0,0,0.1)', /* Add more shadows as needed */],
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/edit-expense/:id" element={<EditExpense />} />
            <Route path="/budget" element={<Budget />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;