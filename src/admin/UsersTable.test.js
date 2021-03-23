import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import UsersTable from './UsersTable';
import { users } from '../res/mockData';
import { mockDeleteUser } from '../res/mockCalls';
import { makeMock, mockResponseType } from '../queries/MockApollo';

describe('UsersTable tests', () => {
  const refetch = jest.fn().mockImplementation();

  it('should display users', () => {
    render(<UsersTable
      users={users}
      refetch={refetch}
    />, undefined, { user: {} });

    expect(screen.getAllByRole('row')).toHaveLength(4);
  });

  it('should open modal on edit', async () => {
    render(<UsersTable
      users={users}
      refetch={refetch}
    />, undefined, { user: {} });

    const userRow = screen.getAllByTestId('admin-user-row')[0];
    userEvent.click(userRow);
    const modal = await screen.findByTestId('admin-modal');
    expect(modal).toBeInTheDocument();
    userEvent.click(modal.querySelector('div'));
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it('should open modal on add', async () => {
    render(<UsersTable
      users={users}
      refetch={refetch}
    />, undefined, { user: {} });

    const fab = screen.getByTestId('admin-fab');
    userEvent.click(fab);
    const modal = await screen.findByTestId('admin-modal');
    expect(modal).toBeInTheDocument();
    userEvent.click(modal.querySelector('div'));
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it('should delete user', async () => {
    render(<UsersTable
      users={users}
      refetch={refetch}
    />, [makeMock(mockDeleteUser, mockResponseType.SUCCESS)], { user: {} });

    const userRow = screen.getAllByTestId('admin-user-row')[0];
    const deleteBtn = userRow.querySelector('button');
    userEvent.click(deleteBtn);
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should not delete user', async () => {
    render(<UsersTable
      users={users}
      refetch={refetch}
    />, [makeMock(mockDeleteUser, mockResponseType.ERROR)], { user: {} });

    const userRow = screen.getAllByTestId('admin-user-row')[0];
    const deleteBtn = userRow.querySelector('button');
    userEvent.click(deleteBtn);
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(0);
    });
  });
});
