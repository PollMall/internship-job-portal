import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewWorkExperience from './NewWorkExperience';
import { render } from '../../setupTests';
import { user } from '../../res/mockData';
import { userProfileAction } from '../useUserProfile';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: (query) => ([
    ({ variables }) => {
      if (variables) {
        return {
          data: {
            createUserWorkExperience: variables,
          },
          query,
        };
      }
      throw new Error('error');
    },
  ]),
}));

describe('NewEducation tests', () => {
  const dispatch = jest.fn().mockImplementation();

  it('should add education', async () => {
    render(<NewWorkExperience userId={user.id} dispatch={dispatch} />);

    const newWorkExperience = {
      institution: 'a',
      description: 'a',
      startDate: '2020-11-11',
      endDate: '2020-12-12',
    };

    userEvent.type(screen.getByLabelText(/institution/i), newWorkExperience.institution);
    userEvent.type(screen.getByLabelText(/description/i), newWorkExperience.description);
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: newWorkExperience.startDate } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: newWorkExperience.endDate } });
    userEvent.click(screen.getByText(/add work experience/i));

    await waitFor(() => {
      expect(dispatch.mock.calls[0][0].type).toEqual(userProfileAction.ADD_WORK_EXPERIENCE);
      expect(dispatch.mock.calls[0][0].payload).not.toEqual({});
    });
  });
});
