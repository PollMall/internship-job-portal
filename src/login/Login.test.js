import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login, { validateUser } from './Login';

describe('login page', () => {
  it('Login page loads properly', () => {
    render(<Login />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Initial state for elements', () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/)).toHaveValue('');
    expect(screen.getByLabelText(/password/)).toHaveValue('');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it.each([
    ['admin', 'admin', true],
    ['admin', '', false],
  ])('.add(%i, %i)', (a, b, expected) => {
    const spy = jest.fn();
    validateUser(a, b, spy);
    expect(spy).toHaveBeenCalledWith(expected);
  });

  it('later', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/);
    expect(usernameInput).toHaveValue('');
    const someInput = 'test';
    userEvent.type(usernameInput, someInput);
    expect(usernameInput).toHaveValue(someInput);
  });

  it('later2', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/password/);
    expect(passwordInput).toHaveValue('');
    const someInput = 'test';
    userEvent.type(passwordInput, someInput);
    expect(passwordInput).toHaveValue(someInput);
  });

  it('check login button', async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);
    const loginBtn = screen.getByRole('button');
    const wrongInput = 'test';
    window.alert = jest.fn();
    userEvent.type(usernameInput, wrongInput);
    userEvent.type(passwordInput, wrongInput);
    userEvent.click(loginBtn);
    expect(window.alert).toHaveBeenCalled();
    userEvent.clear(usernameInput);
    userEvent.clear(passwordInput);
    const correctInput = 'admin';
    userEvent.type(usernameInput, correctInput);
    userEvent.type(passwordInput, correctInput);
    userEvent.click(loginBtn);
    expect(window.alert).toHaveBeenCalled();
  });
});
