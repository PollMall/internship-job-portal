import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import RegisterPage from './RegisterPage';

describe('RegisterPage test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      }),
    });
  });

  it('should match snapshot', () => {
    render(<RegisterPage />, { wrapper: MemoryRouter });
    expect(screen).toMatchSnapshot();
  });
});
