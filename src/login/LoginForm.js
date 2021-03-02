/* eslint-disable max-len */
import React from 'react';
import {
  Button, Snackbar, TextField, Backdrop, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLazyQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { GET_USERS } from '../queries/UserQueries';

export const validateUser = (username, password, callback) => (callback(!!(username && password)));

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const [user, setUser] = React.useState();
  const [getUsers, {
    error, data, called, loading,
  }] = useLazyQuery(GET_USERS, { fetchPolicy: 'network-only' });

  React.useEffect(() => {
    validateUser(username, password, setValid);
  }, [username, password]);

  React.useEffect(() => {
    if (data) {
      setUser(data.users.find((u) => u.username === username && u.password === password));
    }
  }, [data]);

  const loginUser = React.useCallback(() => {
    getUsers();
  }, [username, password]);

  return (
    <>
      <form className={classes.root}>
        <TextField
          data-testid="test123"
          label="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" disabled={!valid} onClick={loginUser}>
          Login
        </Button>
      </form>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar open={called && !!user} data-testid="login--success-alert">
        <Alert severity="success">
          You&apos;re logged in!
        </Alert>
      </Snackbar>
      <Snackbar open={called && !user && !error} data-testid="login--info-alert">
        <Alert severity="info">
          You don&apos;t have an account!
        </Alert>
      </Snackbar>
      <Snackbar open={called && !!error} data-testid="login--error-alert">
        <Alert severity="error">
          An error occured!
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginForm;
