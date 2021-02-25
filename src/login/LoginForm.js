import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { mockLoginUser } from './LoginAPI';

export const validateUser = (username, password, callback) => (callback(!!(username && password)));

function LoginForm() {
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
    <form>
      <label htmlFor="username">
        Enter your username:
        <br />
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="password">
        Enter your password:
        <br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <Button type="primary" disabled={!valid} onClick={loginUser}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
