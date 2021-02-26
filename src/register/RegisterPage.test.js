import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RegisterPage from './RegisterPage';

describe('RegisterPage test', () => {
  it('should match snapshot', () => {
    const { container } = render(<RegisterPage />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
