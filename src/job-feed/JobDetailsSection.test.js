import React from 'react';
import { screen, render } from '@testing-library/react';
import JobDetailsSection from './JobDetailsSection';

describe('JobDetailsSection tests', () => {
  it('should show none', () => {
    const fields = [
      {
        title: 'title',
        data: [],
        component: 'p',
      },
    ];
    render(<JobDetailsSection fields={fields} />);
    expect(screen.getByText(/none/i)).toBeInTheDocument();
  });
});
