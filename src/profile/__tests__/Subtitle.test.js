import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Subtitle from '../Subtitle';
import { render } from '../../setupTests';
import { userProfileAction } from '../useUserProfile';

describe('Subtitle tests', () => {
  const text = 'subtitle';
  const section = 'sectionEdit';
  const spy = jest.fn().mockImplementation();

  it('should display edit icon', () => {
    render(<Subtitle text={text} section={section} dispatch={spy} />);

    const subtitle = screen.getByText(text);
    userEvent.hover(subtitle);
    screen.getByTestId('subtitle-icon');
    userEvent.unhover(subtitle);
    expect(screen.queryByTestId('subtitle-icon')).not.toBeInTheDocument();
  });

  it('should call dispatch', () => {
    render(<Subtitle text={text} section={section} dispatch={spy} />);

    const subtitle = screen.getByText(text);
    userEvent.click(subtitle);
    expect(spy).toHaveBeenCalledWith({ type: userProfileAction.EDIT, payload: section });
  });
});
