import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import RegisterForm from './RegisterForm';

function RegisterPage() {
  return (
    <Grid container alignItems="center" direction="column">
      <h1>Register Form</h1>
      <RegisterForm />
      <p>
        Already have an account?
        <Link to="/login">
          Login Now
        </Link>
      </p>
    </Grid>
  );
}

export default RegisterPage;
