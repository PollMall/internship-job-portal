import React from 'react';
import { render } from './setupTests';
import Unauthorized from './Unauthorized';

describe('Unauthorized tests', () => {
  it('should match snapshot', () => {
    const { container } = render(<Unauthorized />);
    expect(container).toMatchSnapshot();
  });
});
