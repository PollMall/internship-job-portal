import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  ])('.validateUser(%i, %i)', (username, password, expected) => {
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
    const spy = jest.spyOn(window, 'alert').mockImplementation();
    userEvent.type(usernameInput, wrongInput);
    userEvent.type(passwordInput, wrongInput);
    userEvent.click(loginBtn);
    expect(spy).toHaveBeenCalledWith('Login Failed');
    userEvent.clear(usernameInput);
    userEvent.clear(passwordInput);
    const correctInput = 'admin';
    userEvent.type(usernameInput, correctInput);
    userEvent.type(passwordInput, correctInput);
    userEvent.click(loginBtn);
    expect(spy).toHaveBeenCalledWith('Hooray! You just logged in');
  });
});