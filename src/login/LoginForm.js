import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Snackbar, TextField, Backdrop, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLazyQuery } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { GET_USERS } from '../queries/UserQueries';
import { UserContext } from '../UserProvider';
import { userAction } from '../useUser';

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
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [getUsers, {
    error, data, called, loading,
  }] = useLazyQuery(GET_USERS, { fetchPolicy: 'network-only' });

  React.useEffect(() => {
    validateUser(username, password, setValid);
  }, [username, password]);

  React.useEffect(() => {
    if (data) {
      const foundUser = data.users.find((u) => u.username === username && u.password === password);
      if (foundUser) {
        dispatch({ type: userAction.LOGIN, payload: foundUser });
        history.push('/');
      } else {
        setShowInfo(true);
      }
    }
  }, [data]);

  const loginUser = React.useCallback(() => {
    getUsers();
  }, [username, password]);

  return (
    <>
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
        <Snackbar open={showInfo} data-testid="login--info-alert">
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
    </>
  );
}

export default LoginForm;
