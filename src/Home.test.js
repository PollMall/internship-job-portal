import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from './setupTests';
import Home from './Home';

describe('Home tests', () => {
  it('renders the route menu', () => {
    render(<Router><Home /></Router>);
  });
});
