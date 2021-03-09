import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './setupTests';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute tests', () => {
  function MockComponent() {
    return (
      <p>mock</p>
    );
  }

  it('should display given component', () => {
    render(<PrivateRoute component={MockComponent} />,
      undefined,
      { user: { id: 1, username: 'user', password: 'user' } });
    expect(screen.getByText(/mock/i)).toBeInTheDocument();
  });

  it('should redirect', () => {
    const { container } = render(<PrivateRoute component={MockComponent} />);
    expect(container).toMatchInlineSnapshot('<div />');
  });
});
