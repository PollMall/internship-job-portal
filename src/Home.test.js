import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './setupTests';
import Home from './Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: ({ to }) => (to),
}));

describe('Home tests', () => {
  const makeRole = (role) => ({
    user: {
      userRole: {
        name: role,
      },
    },
  });

  it('should render the admin page', () => {
    render(<Home />, undefined, makeRole('sys_admin'));
    screen.getByText(/\/admin/i);
  });

  it('should render the company user page', () => {
    render(<Home />, undefined, makeRole('company_user'));
    screen.getByText(/company user page/i);
  });

  it('should render the user page', () => {
    render(<Home />, undefined, makeRole('user'));
    screen.getByText(/\/jobs/i);
  });

  it('should render page not found', () => {
    render(<Home />, undefined, makeRole('other_role'));
    expect(screen.queryByText(/(\/admin)|(company user page)|(\/jobs)/i)).not.toBeInTheDocument();
  });
});
