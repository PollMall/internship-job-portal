import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './UserProvider';

function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (state.user ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
