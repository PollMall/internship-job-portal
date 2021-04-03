import React from 'react';
import { screen } from '@testing-library/react';
import EducationEdit from './EducationEdit';
import { render } from '../../setupTests';

describe('EducationsPreview tests', () => {
  const education = {
    id: 1,
  };
  it('should have fields empty', () => {
    render(<EducationEdit education={education} />);
    expect(screen.getByLabelText(/institution/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/start date/i)).toHaveValue('');
    expect(screen.getByLabelText(/end date/i)).toHaveValue('');
  });
});
