import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import UserRow from './UserRow';
import { users } from '../res/mockData';

describe('UsersTable tests', () => {
  const onDelete = jest.fn().mockImplementation();
  const onEdit = jest.fn().mockImplementation();

  it('should display users', () => {
    render(<UserRow
      user={users[0]}
      onDelete={onDelete}
      onEdit={onEdit}
    />, undefined, { user: {} });

    userEvent.click(screen.getByRole('button'));
    expect(onDelete).toHaveBeenCalledWith(users[0].id);
  });
});
