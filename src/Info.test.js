import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import Info from './Info';
import { render } from './setupTests';

describe('Info tests', () => {
  it('should appear error', async () => {
    render(<Info error />);
    expect(await screen.findByTestId('info-error')).toBeInTheDocument();
  });

  it('should disappear error', async () => {
    render(<Info error errorAutoHide={100} />);
    expect(await screen.findByTestId('info-error')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('info-error')).not.toBeInTheDocument();
    });
  });
});
