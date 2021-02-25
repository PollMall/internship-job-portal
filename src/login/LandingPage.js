import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

function LandingPage() {
  return (
    <>
      <h1>Login Form</h1>
      <LoginForm />
      <p>
        Don&apos;t have an account?
        <Link to="/register">
          Register Now
        </Link>
      </p>
    </>
  );
}

export default LandingPage;
