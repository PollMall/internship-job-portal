import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage test', () => {
  it('should match snapshot', async () => {
    render(<LandingPage />, { wrapper: MemoryRouter });
    expect(screen).toMatchSnapshot();
  });
});
