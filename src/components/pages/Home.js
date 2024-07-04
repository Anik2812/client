import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Link, Card, CardContent, CardMedia, Divider, IconButton, useTheme } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, Person, Star, MoneyOff } from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          mb: 4,
          padding: 4,
          borderRadius: 2,
          background: theme.palette.background.default,
          boxShadow: theme.shadows[5]
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          Welcome to Your Financial Dashboard
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, color: theme.palette.text.secondary }}>
          Manage your expenses, track your spending, and reach your financial goals with ease.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          href="/register"
          endIcon={<ArrowForwardIcon />}
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, boxShadow: theme.shadows[3] }}>
            <CardMedia>
              <Person color="primary" sx={{ fontSize: 60, mb: 2 }} />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                User Friendly
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Intuitive and easy-to-use interface to track and manage your expenses effortlessly.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, boxShadow: theme.shadows[3] }}>
            <CardMedia>
              <Star color="primary" sx={{ fontSize: 60, mb: 2 }} />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                Powerful Insights
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Gain insights into your spending patterns with detailed charts and reports.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, boxShadow: theme.shadows[3] }}>
            <CardMedia>
              <MoneyOff color="primary" sx={{ fontSize: 60, mb: 2 }} />
            </CardMedia>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                Save More
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Set budgets, track your savings, and make informed financial decisions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call-to-Action Section */}
      <Box 
        sx={{ 
          textAlign: 'center',
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: theme.palette.primary.main,
          color: '#fff'
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
          Ready to Take Control of Your Finances?
        </Typography>
        <Typography variant="h6" component="p" gutterBottom sx={{ mb: 4 }}>
          Join us today and start managing your money more effectively.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          href="/register"
          endIcon={<ArrowForwardIcon />}
        >
          Get Started
        </Button>
      </Box>

      {/* About Us Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          About Us
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          We are a team of financial enthusiasts dedicated to helping you achieve your financial goals. Our platform offers a range of tools and features to make managing your expenses simple and effective.
        </Typography>
        <Link href="/about" variant="body2" color="secondary">
          Learn More About Us
        </Link>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          What Our Users Say
        </Typography>
        <Divider sx={{ mb: 4, mx: 'auto', width: '50%', borderColor: theme.palette.text.secondary }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="p" gutterBottom sx={{ mb: 2 }}>
                "This app has completely changed the way I manage my expenses. It's so easy to use and has helped me save a lot of money!"
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Alex M.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="p" gutterBottom sx={{ mb: 2 }}>
                "A fantastic tool for anyone looking to get their finances in order. The charts and reports are incredibly useful."
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Jamie R.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="p" gutterBottom sx={{ mb: 2 }}>
                "I love the user-friendly design and the powerful features. It's made managing my budget so much easier."
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Taylor W.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box sx={{ textAlign: 'center', mb: 4, py: 4, backgroundColor: theme.palette.background.default }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          © 2024 Your Financial Dashboard. All Rights Reserved.
        </Typography>
        <Link href="/privacy" variant="body2" color="secondary">
          Privacy Policy
        </Link> | 
        <Link href="/terms" variant="body2" color="secondary">
          Terms of Service
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
