import React from 'react';
import { screen } from '@testing-library/react';
import WorkExperiencesPreview from './WorkExperiencesPreview';
import { render } from '../../setupTests';

describe('EducationsPreview tests', () => {
  const workExperiences = [{
    id: 1,
    institution: 'institution',
    description: 'description',
    startDate: '1538265600',
    endDate: '0',
  }];
  it('should display current', () => {
    render(<WorkExperiencesPreview workExperiences={workExperiences} />);
    screen.getByText(/current/i);
  });
});
