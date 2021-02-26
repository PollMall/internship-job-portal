import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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
    const { container } = render(<RegisterPage />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
