import React from 'react';
import { render } from '../setupTests';
import PageNotFound from './PageNotFound';

describe('PageNotFound test', () => {
  it('should match snapshot', () => {
    const { container } = render(<PageNotFound />);
    expect(container).toMatchSnapshot();
  });
});
