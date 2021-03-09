import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './UserProvider';

function RedirectLoggedInRoute({ component: Component, ...rest }) {
  const { state } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (state.user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
}

export default RedirectLoggedInRoute;
