import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../setupTests';
import AdminPage from './AdminPage';
import { makeMock, mockResponseType } from '../queries/MockApollo';
import { mockGetUsers as mockData } from '../res/mockCalls';

describe('AdminPage tests', () => {
  it('should match snapshot', () => {
    const { container } = render(<AdminPage />, undefined, { user: {} });
    expect(container).toMatchSnapshot();
  });

  it('should display table', async () => {
    render(<AdminPage />, [makeMock(mockData, mockResponseType.SUCCESS)], { user: {} });
    expect(await screen.findByRole('table')).toBeInTheDocument();
  });
});
