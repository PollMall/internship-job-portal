import React from 'react';
// import { useHistory } from 'react-router-dom';
import { mockLoginUser } from './LoginAPI';

export const validateUser = (username, password, callback) => (callback(!!(username && password)));

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState(false);
  // const history = useHistory();

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
    <div>
      <h1>Welcome to Login Page</h1>
      <form>
        <label htmlFor="username">
          Enter your username:
          <br />
          <input
            type="username"
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
        <button type="button" disabled={!valid} onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
