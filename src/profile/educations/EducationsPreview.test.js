import React from 'react';
import { screen } from '@testing-library/react';
import EducationsPreview from './EducationsPreview';
import { render } from '../../setupTests';

describe('EducationsPreview tests', () => {
  const educations = [{
    id: 1,
    institution: 'institution',
    description: 'description',
    startDate: '1538265600',
    endDate: '0',
  }];
  it('should display current', () => {
    render(<EducationsPreview educations={educations} />);
    screen.getByText(/current/i);
  });
});
