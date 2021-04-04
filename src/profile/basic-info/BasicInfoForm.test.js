import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicInfoForm from './BasicInfoForm';
import { render } from '../../setupTests';
import { user } from '../../res/mockData';

describe('BasicInfoForm tests', () => {
  const onCancel = jest.fn().mockImplementation();

  it('should cancel form', () => {
    render(<BasicInfoForm user={user} onCancel={onCancel} />);

    const cancel = screen.getByText(/cancel/i);
    userEvent.click(cancel);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
