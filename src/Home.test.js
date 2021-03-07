import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { render } from './setupTests';
import Home from './Home';

describe('Home tests', () => {
  it('renders the route menu', () => {
    render(<Router><Home /></Router>);
  });

  it('should display main page', () => {
    render(<Home />, undefined, { user: { username: 'user', password: 'user' } });
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
