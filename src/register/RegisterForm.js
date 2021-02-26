import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mockRegisterUser } from './RegisterAPI';

export const validateRegisterUser = (username, firstName, lastName, password, callback) => {
  callback(!!(username && firstName && lastName && password));
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function RegisterForm() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    validateRegisterUser(username, firstName, lastName, password, setValid);
  }, [username, firstName, lastName, password]);
  const registerUser = React.useCallback(() => {
    const res = mockRegisterUser();
    if (res.success) {
      alert('Hooray! You just registered');
      history.push('/home');
    }
  }, []);

  return (
    <>
      <p>Please provide your personal information</p>
      <form className={classes.root}>
        <TextField
          label="Username"
          name="username"
          id="username"
          error={!username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
          label="First Name"
          name="firstName"
          id="firstname"
          error={!firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          label="Last Name"
          name="lastName"
          id="lastname"
          error={!lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          name="password"
          id="password"
          error={!password}
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" disabled={!valid} onClick={registerUser}>
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;
