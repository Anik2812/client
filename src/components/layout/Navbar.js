import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Home, Dashboard, AttachMoney, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ mr: 1 }} />
            FinanceApp
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/" startIcon={<Home />}>
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/dashboard" startIcon={<Dashboard />}>
              Dashboard
            </Button>
            <Button color="inherit" component={RouterLink} to="/budget" startIcon={<AttachMoney />}>
              Budget
            </Button>
            <Button color="inherit" component={RouterLink} to="/login" startIcon={<AccountCircle />}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;