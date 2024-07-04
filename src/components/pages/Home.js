import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Link, Card, CardContent, CardMedia, Divider, useTheme } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, Person, Star, MoneyOff } from '@mui/icons-material';
import { Zoom, Fade, Slide } from 'react-reveal';

const Home = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Hero Section */}
      <Zoom>
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
            boxShadow: theme.shadows[5],
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
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
            sx={{ transition: 'background 0.3s', '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
          >
            Get Started
          </Button>
        </Box>
      </Zoom>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {[
          { icon: <Person color="primary" sx={{ fontSize: 60, mb: 2 }} />, title: 'User Friendly', description: 'Intuitive and easy-to-use interface to track and manage your expenses effortlessly.' },
          { icon: <Star color="primary" sx={{ fontSize: 60, mb: 2 }} />, title: 'Powerful Insights', description: 'Gain insights into your spending patterns with detailed charts and reports.' },
          { icon: <MoneyOff color="primary" sx={{ fontSize: 60, mb: 2 }} />, title: 'Save More', description: 'Set budgets, track your savings, and make informed financial decisions.' },
        ].map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Slide bottom>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  boxShadow: theme.shadows[3],
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia>{feature.icon}</CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>

      {/* Call-to-Action Section */}
      <Fade>
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            mb: 4,
            borderRadius: 2,
            background: theme.palette.primary.main,
            color: '#fff',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'scale(1.05)' },
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
            sx={{ transition: 'background 0.3s', '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
          >
            Get Started
          </Button>
        </Box>
      </Fade>

      {/* About Us Section */}
      <Fade>
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
      </Fade>

      {/* Testimonials Section */}
      <Fade>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
            What Our Users Say
          </Typography>
          <Divider sx={{ mb: 4, mx: 'auto', width: '50%', borderColor: theme.palette.text.secondary }} />
          <Grid container spacing={4}>
            {[
              { quote: "This app has completely changed the way I manage my expenses. It's so easy to use and has helped me save a lot of money!", author: 'Alex M.' },
              { quote: 'A fantastic tool for anyone looking to get their finances in order. The charts and reports are incredibly useful.', author: 'Jamie R.' },
              { quote: 'I love the user-friendly design and the powerful features. It\'s made managing my budget so much easier.', author: 'Taylor W.' },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <Typography variant="h6" component="p" gutterBottom sx={{ mb: 2 }}>
                    {testimonial.quote}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    - {testimonial.author}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>

      {/* Footer Section */}
      <Box sx={{ textAlign: 'center', mb: 4, py: 4, backgroundColor: theme.palette.background.default }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          © 2024 Your Financial Dashboard. All Rights Reserved.
        </Typography>
        <Link href="/privacy" variant="body2" color="secondary">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link href="/terms" variant="body2" color="secondary">
          Terms of Service
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
