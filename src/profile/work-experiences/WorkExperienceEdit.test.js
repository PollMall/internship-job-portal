import React from 'react';
import { screen } from '@testing-library/react';
import WorkExperienceEdit from './WorkExperienceEdit';
import { render } from '../../setupTests';

describe('WorkExperienceEdit tests', () => {
  const workExperience = {
    id: 1,
  };
  it('should have fields empty', () => {
    render(<WorkExperienceEdit workExperience={workExperience} />);
    expect(screen.getByLabelText(/institution/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/start date/i)).toHaveValue('');
    expect(screen.getByLabelText(/end date/i)).toHaveValue('');
  });
});
