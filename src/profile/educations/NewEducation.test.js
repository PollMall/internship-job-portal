import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewEducation from './NewEducation';
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
            createUserEducation: variables,
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
    render(<NewEducation userId={user.id} dispatch={dispatch} />);

    const newEducation = {
      institution: 'a',
      description: 'a',
      startDate: '2020-11-11',
      endDate: '2020-12-12',
    };

    userEvent.type(screen.getByLabelText(/institution/i), newEducation.institution);
    userEvent.type(screen.getByLabelText(/description/i), newEducation.description);
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: newEducation.startDate } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: newEducation.endDate } });
    userEvent.click(screen.getByText(/add education/i));

    await waitFor(() => {
      expect(dispatch.mock.calls[0][0].type).toEqual(userProfileAction.ADD_EDUCATION);
      expect(dispatch.mock.calls[0][0].payload).not.toEqual({});
    });
  });
});
