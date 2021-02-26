import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage test', () => {
  it('should match snapshot', async () => {
    const { container } = render(<LandingPage />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
