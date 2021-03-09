import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './setupTests';
import NavBar from './NavBar';

describe('NavBar tests', () => {
  it('should be rendered', () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });

  it('should have username displayed ', () => {
    render(<NavBar />, undefined, { user: { id: 1, username: 'user', password: 'user' } });
    const logoutBtn = screen.getByTestId('navbar--logout-btn');
    userEvent.click(logoutBtn);
    expect(screen.getByTestId('navbar--header-message')).toHaveTextContent(/^Hello$/);
  });
});
