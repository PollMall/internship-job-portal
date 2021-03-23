import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import apolloClient from './apollo';
import Home from './Home';
import LandingPage from './login/LandingPage';
import RegisterPage from './register/RegisterPage';
import PageNotFound from './404page/PageNotFound';
import UserProvider from './UserProvider';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import RedirectLoggedInRoute from './RedirectLoggedInRoute';
import JobFeedPage from './job-feed/JobFeedPage';
import JobDetailsPage from './job-feed/JobDetailsPage';
import AdminPage from './admin/AdminPage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <NavBar />
        <Router>
          <Switch>
            <PrivateRoute component={Home} path="/home" to="/login" exact />
            <PrivateRoute component={JobFeedPage} path="/jobs" to="/login" exact />
            <PrivateRoute component={JobDetailsPage} path="/jobs/:id" to="/login" exact />
            <PrivateRoute component={AdminPage} path="/admin" to="/login" exact roles={['sys_admin']} />
            <RedirectLoggedInRoute component={LandingPage} path="/login" to="/" exact />
            <Route path="/register" component={RegisterPage} exact />
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
