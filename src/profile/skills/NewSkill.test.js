import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewSkill from './NewSkill';
import { render } from '../../setupTests';
import { UserProfileContext } from '../UserProfileProvider';
import { user } from '../../res/mockData';
import { userProfileAction } from '../useUserProfile';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: (query) => ([
    async ({ variables }) => {
      if (variables) {
        return {
          data: {
            createUserSkill: 'createUserSkill',
          },
          query,
        };
      }
      throw new Error('error');
    },
  ]),
}));

describe('SkillsEdit tests', () => {
  const skills = [
    {
      value: {
        skill: {
          id: 2,
          name: 'React',
        },
      },
      label: 'React',
    },
  ];
  const state = {
    user,
  };
  const dispatch = jest.fn().mockImplementation();

  it('should add skill', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <NewSkill skills={skills} userId={user.id} dispatch={dispatch} />
      </UserProfileContext.Provider>,
    );

    userEvent.type(screen.getByLabelText(/add a new skill/i), 'React{enter}');
    userEvent.type(screen.getByTestId('newskill-rating'), '{arrowright}{enter}');

    userEvent.click(screen.getByText(/add skill/i));
    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalledWith({
        type: userProfileAction.ADD_SKILL,
        payload: 'createUserSkill',
      });
    });
  });
});
