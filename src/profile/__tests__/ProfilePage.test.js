import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import ProfilePage from '../ProfilePage';
import { render } from '../../setupTests';
import { getUser } from '../../res/mockCalls';
import { users } from '../../res/mockData';
import { makeMock, mockResponseType } from '../../queries/MockApollo';

describe('ProfilePage tests', () => {
  it('should match snapshot', () => {
    const { container } = render(<ProfilePage />);
    expect(container).toMatchSnapshot();
  });

  it('should display user profile', async () => {
    render(<ProfilePage />, [makeMock(getUser, mockResponseType.SUCCESS)], { user: users[0] });
    await waitFor(() => {
      expect(screen.queryByTestId('info-loading')).not.toBeInTheDocument();
    });
  });
});
