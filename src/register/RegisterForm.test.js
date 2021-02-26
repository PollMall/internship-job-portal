import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

describe('RegisterForm testing', () => {
  it('register btn', () => {
    render(<RegisterForm />, { wrapper: MemoryRouter });

    const input = 'text';
    const usernameInput = screen.getByLabelText(/Username/);
    const firstInput = screen.getByLabelText(/First Name/);
    const lastInput = screen.getByLabelText(/Last Name/);
    const passInput = screen.getByLabelText(/Password/);
    const registerBtn = screen.getByRole('button');
    const spy = jest.spyOn(window, 'alert').mockImplementation();
    userEvent.type(usernameInput, input);
    userEvent.type(firstInput, input);
    userEvent.type(lastInput, input);
    userEvent.type(passInput, input);
    userEvent.click(registerBtn);
    expect(spy).toHaveBeenCalledWith('Hooray! You just registered');
  });

  it.each([
    ['test', 'test', 'test', 'test', false],
    ['', 'test', 'test', 'test', true],
    ['test', '', 'test', 'test', true],
    ['test', 'test', '', 'test', true],
    ['test', 'test', 'test', '', true],
    ['', 'test', '', 'test', true],
    ['', '', '', '', true],
  ])('username: %s, firstName: %s, lastName: %s, password: %s', (username, first, last, pass, expected) => {
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
