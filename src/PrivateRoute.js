import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './UserProvider';
import PageNotFound from './404page/PageNotFound';

function RoleRoute({
  component: Component, user, roles, ...rest
}) {
  const hasRequiredRole = (role) => (!roles || roles.indexOf(role) !== -1);

  return (
    <Route
      {...rest}
      render={(props) => (
        hasRequiredRole(user?.userRole?.name) ? <Component {...props} /> : <PageNotFound />)}
    />
  );
}

function PrivateRoute({
  component, to, roles, ...rest
}) {
  const { state } = useContext(UserContext);

  return (
    <>
      {state?.user
        ? <RoleRoute component={component} user={state?.user} roles={roles} {...rest} />
        : <Redirect to={to} />}
    </>
  );
}

export default PrivateRoute;
