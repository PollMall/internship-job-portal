import React from 'react';
import {
  Button, TextField, Backdrop, CircularProgress, Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { useRegister } from './RegisterAPI';
import { useMutation } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { CREATE_USER } from '../queries/UserQueries';
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
  const [register, {
    error, loading, data, called,
  }] = useMutation(CREATE_USER);


  React.useEffect(() => {
    validateRegisterUser(username, firstName, lastName, password, setValid);
  }, [username, firstName, lastName, password]);

  React.useEffect(() => {
    if (!error) {
      setUsername('');
      setFirstName('');
      setLastName('');
      setPassword('');
    }
  }, [data]);

  const registerUser = React.useCallback(async () => {
    await register({
      variables: {
        username, firstName, lastName, password, userRoleId: 3,
      },
    });
  }, [username, firstName, lastName, password]);


  return (
    <>
      <p>Please provide your personal information</p>
      <form className={classes.root}>
        <TextField
          value={username}
          label="Username"
          name="username"
          id="username"
          error={!username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
          value={firstName}
          label="First Name"
          name="firstName"
          id="firstname"
          error={!firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          value={lastName}
          label="Last Name"
          name="lastName"
          id="lastname"
          error={!lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <TextField
          value={password}
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
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar data-testid="register--success-alert" open={called && !!data}>
        <Alert severity="success">
          You&apos;re registered!
        </Alert>
      </Snackbar>
      <Snackbar open={!!error}>
        <Alert severity="error">
          An error occured!
        </Alert>
      </Snackbar>
      {error && console.log(error)}
    </>
  );
}

export default RegisterForm;
