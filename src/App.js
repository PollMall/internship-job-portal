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
import Login from './login/Login';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
