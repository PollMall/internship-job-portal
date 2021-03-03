import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import LoginForm, { validateUser } from './LoginForm';
import { GET_USERS } from '../queries/UserQueries';
import { mockResponseType, makeMock } from '../queries/MockApollo';

describe('login page', () => {
  it('Initial state for elements', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Username/)).toHaveValue('');
    expect(screen.getByLabelText(/Password/)).toHaveValue('');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it.each([
    ['admin', 'admin', true],
    ['admin', '', false],
  ])('.validateUser(%s, %s)', (username, password, expected) => {
    const spy = jest.fn();
    validateUser(username, password, spy);
    expect(spy).toHaveBeenCalledWith(expected);
  });

  it.each([
    ['test', 'test', false],
    ['test', '', true],
    ['', 'test', true],
    ['', '', true],
  ])('check button availability for user: %s, pass: %s', (username, password, expected) => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const loginBtn = screen.getByRole('button');
    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    expect(loginBtn.hasAttribute('disabled')).toEqual(expected);
  });

  it('should alert with info', async () => {
    const mockData = {
      query: GET_USERS,
      variables: {},
      response: {
        users: [
          {
            id: 1,
            username: 'admin',
            password: 'admin',
          },
        ],
      },
    };
    const wrongInput = 'test';

    render(<LoginForm />, [makeMock(mockData, mockResponseType.SUCCESS)]);
    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const loginBtn = screen.getByRole('button');

    userEvent.type(usernameInput, wrongInput);
    userEvent.type(passwordInput, wrongInput);
    userEvent.click(loginBtn);
    expect(await screen.findByTestId('login--info-alert')).toBeInTheDocument();
  });

  it('should alert with success', async () => {
    const correctUsernameInput = 'User';
    const correctPasswordInput = 'UXdlcnR5MTIz';
    const mockData = {
      query: GET_USERS,
      variables: {},
      response: {
        users: [
          {
            id: 1,
            username: correctUsernameInput,
            password: correctPasswordInput,
          },
        ],
      },
    };

    render(<LoginForm />, [makeMock(mockData, mockResponseType.SUCCESS)]);
    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const loginBtn = screen.getByRole('button');

    userEvent.type(usernameInput, correctUsernameInput);
    userEvent.type(passwordInput, correctPasswordInput);
    userEvent.click(loginBtn);
    expect(await screen.findByTestId('login--success-alert')).toBeInTheDocument();
  });

  it('should alert with error', async () => {
    const usernameInputText = 'user';
    const passwordInputText = 'user';
    const mockData = {
      query: GET_USERS,
      variables: {},
      response: {
        error: 'An error occured!',
      },
    };

    render(<LoginForm />, [makeMock(mockData, mockResponseType.ERROR)]);
    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const loginBtn = screen.getByRole('button');

    userEvent.type(usernameInput, usernameInputText);
    userEvent.type(passwordInput, passwordInputText);
    userEvent.click(loginBtn);
    expect(await screen.findByTestId('login--error-alert')).toBeInTheDocument();
  });
});
