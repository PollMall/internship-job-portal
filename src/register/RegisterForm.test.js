import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import RegisterForm from './RegisterForm';
import { CREATE_USER } from '../queries/UserQueries';
import { mockResponseType, makeMock } from '../queries/MockApollo';

describe('RegisterForm testing', () => {
  it('should alert with success', async () => {
    const input = 'text';
    const mockData = {
      query: CREATE_USER,
      variables: {
        username: input, firstName: input, lastName: input, password: input, userRoleId: 3,
      },
      response: {
        createUser: {
          username: input,
          firstName: input,
          lastName: input,
          password: input,
        },
      },
    };

    render(<RegisterForm />, [makeMock(mockData, mockResponseType.SUCCESS)]);

    const usernameInput = screen.getByLabelText(/Username/);
    const firstInput = screen.getByLabelText(/First Name/);
    const lastInput = screen.getByLabelText(/Last Name/);
    const passInput = screen.getByLabelText(/Password/);
    const registerBtn = screen.getByRole('button');

    userEvent.type(usernameInput, input);
    userEvent.type(firstInput, input);
    userEvent.type(lastInput, input);
    userEvent.type(passInput, input);
    userEvent.click(registerBtn);
    expect(await screen.findByTestId('register--success-alert')).toBeInTheDocument();
  });

  it.each([
    ['test', 'test', 'test', 'test', false],
    ['', 'test', 'test', 'test', true],
    ['test', '', 'test', 'test', true],
    ['test', 'test', '', 'test', true],
    ['test', 'test', 'test', '', true],
    ['', 'test', '', 'test', true],
    ['', '', '', '', true],
  ])('check btn disabled for username: %s, firstName: %s, lastName: %s, password: %s',
    (username, first, last, pass, expected) => {
      render(<RegisterForm />);
      const usernameInput = screen.getByLabelText(/Username/);
      const firstInput = screen.getByLabelText(/First Name/);
      const lastInput = screen.getByLabelText(/Last Name/);
      const passInput = screen.getByLabelText(/Password/);
      const registerBtn = screen.getByRole('button');
      userEvent.type(usernameInput, username);
      userEvent.type(firstInput, first);
      userEvent.type(lastInput, last);
      userEvent.type(passInput, pass);
      expect(registerBtn.hasAttribute('disabled')).toEqual(expected);
    });
});
