import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login, { validateUser } from './Login';

describe('login page', () => {
  it('Initial state for elements', () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/)).toHaveValue('');
    expect(screen.getByLabelText(/password/)).toHaveValue('');
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
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);
    const loginBtn = screen.getByRole('button');
    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    expect(loginBtn.hasAttribute('disabled')).toEqual(expected);
  });

  it('check login button', async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);
    const loginBtn = screen.getByRole('button');
    const wrongInput = 'test';
    window.alert = jest.fn();
    const spy = jest.spyOn(window, 'alert');
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
