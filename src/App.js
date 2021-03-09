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

function App() {
  // const user = null;

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <NavBar />
        <Router>
          <Switch>
            <PrivateRoute component={Home} path="/home" exact />
            <Route path="/login" exact>
              <LandingPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
