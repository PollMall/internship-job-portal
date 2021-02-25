import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function RegisterPage() {
  return (
    <>
      <h1>Register Form</h1>
      <RegisterForm />
      <p>
        Already have an account?
        <Link to="/login">
          Login Now
        </Link>
      </p>
    </>
  );
}

export default RegisterPage;
