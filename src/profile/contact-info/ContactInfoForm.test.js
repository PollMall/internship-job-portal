import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactInfoForm from './ContactInfoForm';
import { render } from '../../setupTests';
import { contactInfo } from '../../res/mockData';

describe('ContactInfoForm tests', () => {
  const onCancel = jest.fn().mockImplementation();

  it('should cancel form', () => {
    render(<ContactInfoForm contactInfo={contactInfo} onCancel={onCancel} />);

    const cancel = screen.getByText(/cancel/i);
    userEvent.click(cancel);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
