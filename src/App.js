import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import apolloClient from './apollo';
import Home from './Home';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
