import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mockLoginUser } from './LoginAPI';

export const validateUser = (username, password, callback) => (callback(!!(username && password)));

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    validateUser(username, password, setValid);
  }, [username, password]);
  const loginUser = React.useCallback(() => {
    const res = mockLoginUser(username, password);
    if (res.success) {
      alert('Hooray! You just logged in');
      // history.goBack();
    } else {
      alert('Login Failed');
    }
  });

  return (
    <form className={classes.root}>
      <TextField
        label="Username"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <TextField
        label="Password"
        name="password"
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" color="primary" disabled={!valid} onClick={loginUser}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
