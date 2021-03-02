import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import RegisterForm from './RegisterForm';

describe('RegisterForm testing', () => {
  it('register btn', async () => {
    render(<RegisterForm />);

    const input = 'text';
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
    await new Promise((resolve) => setTimeout(resolve, 0));
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
  ])('check btn disabled for username: %s, firstName: %s, lastName: %s, password: %s', (username, first, last, pass, expected) => {
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
