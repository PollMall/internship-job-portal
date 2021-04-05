import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserProvider';
import PageNotFound from './404page/PageNotFound';

function Home() {
  const { state } = useContext(UserContext);

  switch (state.user.userRole.name) {
    case 'sys_admin':
      return <Redirect to="/admin" />;
    case 'company_user':
      return <h2>Company user page</h2>;
    case 'user':
      return <Redirect to="/jobs" />;
    default:
      return <PageNotFound />;
  }
}

export default Home;
