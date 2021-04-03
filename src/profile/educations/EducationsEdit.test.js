import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EducationsEdit from './EducationsEdit';
import { render } from '../../setupTests';
import { user } from '../../res/mockData';
import { UserProfileContext } from '../UserProfileProvider';
import { userProfileAction } from '../useUserProfile';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: (query) => ([
    ({ variables }) => {
      if (variables) {
        return {
          data: {
            updateUserEducation: variables,
          },
          query,
        };
      }
      throw new Error('error');
    },
  ]),
}));

describe('EducationsEdit tests', () => {
  const state = {
    user,
  };
  const dispatch = jest.fn().mockImplementation();
  const section = 'educationsEdit';

  it('should cancel edit mode', () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <EducationsEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getByText(/cancel/i));
    expect(dispatch).toHaveBeenCalledWith({
      type: userProfileAction.CANCEL,
      payload: section,
    });
  });

  it('should delete education', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <EducationsEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getAllByText(/delete/i)[0]);
    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalledWith({
        type: userProfileAction.UPDATE_EDUCATIONS,
        payload: user.userEducations,
      });
    });
  });

  it('should update education', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <EducationsEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.type(screen.getAllByLabelText(/institution/i)[0], 'a');
    userEvent.type(screen.getAllByLabelText(/description/i)[0], 'a');
    fireEvent.change(screen.getAllByLabelText(/start date/i)[0], { target: { value: '2020-11-11' } });
    fireEvent.change(screen.getAllByLabelText(/end date/i)[0], { target: { value: '2020-12-12' } });
    userEvent.click(screen.getAllByText(/save/i)[0]);

    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalledWith({
        type: userProfileAction.UPDATE_EDUCATIONS,
        payload: user.userEducations,
      });
    });
  });
});
