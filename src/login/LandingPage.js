import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import LoginForm from './LoginForm';

function LandingPage() {
  return (
    <Grid container direction="column" alignItems="center">
      <h1>Login Form</h1>
      <LoginForm />
      <p>
        Don&apos;t have an account?
        <Link to="/register">
          Register Now
        </Link>
      </p>
    </Grid>
  );
}

export default LandingPage;
