import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkExperiencesEdit from './WorkExperiencesEdit';
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

describe('WorkExperiencesEdit tests', () => {
  const state = {
    user,
  };
  const dispatch = jest.fn().mockImplementation();
  const section = 'workExperiencesEdit';

  it('should cancel edit mode', () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <WorkExperiencesEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getByText(/cancel/i));
    expect(dispatch).toHaveBeenCalledWith({
      type: userProfileAction.CANCEL,
      payload: section,
    });
  });

  it('should delete work experience', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <WorkExperiencesEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getAllByText(/delete/i)[0]);
    await waitFor(() => {
      expect(dispatch.mock.calls[0][0].type).toEqual(userProfileAction.UPDATE_WORK_EXPERIENCES);
      expect(dispatch.mock.calls[0][0].payload).not.toEqual(user.userWorkExperiences);
    });
  });

  it('should update education', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <WorkExperiencesEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.type(screen.getAllByLabelText(/institution/i)[0], 'a');
    userEvent.type(screen.getAllByLabelText(/description/i)[0], 'a');
    fireEvent.change(screen.getAllByLabelText(/start date/i)[0], { target: { value: '2020-11-11' } });
    fireEvent.change(screen.getAllByLabelText(/end date/i)[0], { target: { value: '2020-12-12' } });
    userEvent.click(screen.getAllByText(/save/i)[0]);

    await waitFor(() => {
      expect(dispatch.mock.calls[0][0].type).toEqual(userProfileAction.UPDATE_WORK_EXPERIENCES);
      expect(dispatch.mock.calls[0][0].payload).not.toEqual(user.userWorkExperiences);
    });
  });
});
