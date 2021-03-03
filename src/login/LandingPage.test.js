import React from 'react';
import { render } from '../setupTests';
import LandingPage from './LandingPage';

describe('LandingPage test', () => {
  it('should match snapshot', async () => {
    const { container } = render(<LandingPage />);
    expect(container).toMatchSnapshot();
  });
});
