import React from 'react';
import { render } from '../setupTests';
import RegisterPage from './RegisterPage';

describe('RegisterPage test', () => {
  it('should match snapshot', () => {
    const { container } = render(<RegisterPage />);
    expect(container).toMatchSnapshot();
  });
});
