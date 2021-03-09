import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './setupTests';
import RedirectLoggedInRoute from './RedirectLoggedInRoute';

describe('PrivateRoute tests', () => {
  function MockComponent() {
    return (
      <p>login</p>
    );
  }

  it('should display given component', () => {
    render(<RedirectLoggedInRoute component={MockComponent} />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should redirect', () => {
    const { container } = render(<RedirectLoggedInRoute component={MockComponent} />,
      undefined,
      { user: { id: 1, username: 'user', password: 'user' } });
    expect(container).toMatchInlineSnapshot('<div />');
  });
});
