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
import ProfilePage from './profile/ProfilePage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Router>
          <NavBar />
          <Switch>
            <PrivateRoute component={Home} path="/home" to="/login" exact />
            <PrivateRoute component={JobFeedPage} path="/jobs" to="/login" exact />
            <PrivateRoute component={JobDetailsPage} path="/jobs/:id" to="/login" exact />
            <PrivateRoute component={AdminPage} path="/admin" to="/login" exact roles={['sys_admin']} />
            <PrivateRoute component={ProfilePage} path="/profile" to="/login" exact roles={['user']} />
            <RedirectLoggedInRoute component={LandingPage} path="/login" to="/" exact />
            <RedirectLoggedInRoute component={RegisterPage} path="/register" to="/" exact />
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <PrivateRoute component={PageNotFound} to="/login" />
          </Switch>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
