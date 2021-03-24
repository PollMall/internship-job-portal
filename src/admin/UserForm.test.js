import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import { users } from '../res/mockData';
import { getUserRoles } from '../res/mockCalls';
import UserForm from './UserForm';
import { makeMock, mockResponseType } from '../queries/MockApollo';

describe('UserForm tests', () => {
  const createMockFn = (val) => jest.fn().mockImplementation(() => {
    if (val === 'error') {
      throw val;
    }
  });

  const simulateUserEvent = async () => {
    const {
      username, firstName, lastName, password, userRole,
    } = users[0];
    userEvent.type(await screen.findByLabelText(/username/i), username);
    userEvent.type(await screen.findByLabelText(/first name/i), firstName);
    userEvent.type(await screen.findByLabelText(/last name/i), lastName);
    userEvent.type(await screen.findByLabelText(/password/i), password);
    userEvent.type(await screen.findByLabelText(/user role/i), `${userRole.name}{arrowdown}{enter}`);
  };

  it('should create user', async () => {
    const callApi = createMockFn();
    render(<UserForm callApi={callApi} />, [makeMock(getUserRoles, mockResponseType.SUCCESS)]);
    await simulateUserEvent();

    userEvent.click(await screen.findByRole('button'));
    expect(callApi).toHaveBeenCalled();
  });

  it('should update user', async () => {
    const callApi = createMockFn();
    render(<UserForm user={users[0]} callApi={callApi} />, [makeMock(getUserRoles, mockResponseType.SUCCESS)]);
    await simulateUserEvent();

    userEvent.click(await screen.findByRole('button'));
    expect(callApi).toHaveBeenCalled();
  });

  it('should throw error ', async () => {
    const callApi = createMockFn('error');
    render(<UserForm user={users[0]} callApi={callApi} />, [makeMock(getUserRoles, mockResponseType.SUCCESS)]);
    await simulateUserEvent();

    userEvent.click(await screen.findByRole('button'));
    expect(callApi).toThrowError();
  });

  it('should have button disabled', async () => {
    render(<UserForm />, [makeMock(getUserRoles, mockResponseType.SUCCESS)]);
    expect((await screen.findByRole('button')).hasAttribute('disabled')).toBeTruthy();
  });
});
