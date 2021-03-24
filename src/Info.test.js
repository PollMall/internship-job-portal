import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import Info from './Info';
import { render } from './setupTests';

describe('Info tests', () => {
  it('should appear error', async () => {
    render(<Info error />);
    await screen.findByTestId('info-error');
  });

  it('should disappear error', async () => {
    render(<Info error errorAutoHide={100} />);
    await screen.findByTestId('info-error');
    await waitFor(() => {
      expect(screen.queryByTestId('info-error')).not.toBeInTheDocument();
    });
  });
});
