import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../setupTests';
import LoginForm, { validateUser } from './LoginForm';

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

  it('check login button', async () => {
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const loginBtn = screen.getByRole('button');

    const wrongInput = 'test';
    userEvent.type(usernameInput, wrongInput);
    userEvent.type(passwordInput, wrongInput);
    userEvent.click(loginBtn);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(await screen.findByTestId('login--info-alert')).toBeInTheDocument();

    const correctUsernameInput = 'User';
    const correctPasswordInput = 'UXdlcnR5MTIz';
    userEvent.clear(usernameInput);
    userEvent.clear(passwordInput);
    userEvent.type(usernameInput, correctUsernameInput);
    userEvent.type(passwordInput, correctPasswordInput);
    userEvent.click(loginBtn);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(await screen.findByTestId('login--success-alert')).toBeInTheDocument();
  });
});
