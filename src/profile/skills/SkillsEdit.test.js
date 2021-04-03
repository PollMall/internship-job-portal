import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SkillsEdit from './SkillsEdit';
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
          variables,
          query,
        };
      }
      throw new Error('error');
    },
  ]),
  useQuery: (query) => ({
    data: {
      skills: [
        {
          id: 1,
          skill: {
            id: 1,
            name: 'HTML',
          },
          rating: 5,
        },
      ],
    },
    error: undefined,
    loading: false,
    query,
  }),
}));

describe('SkillsEdit tests', () => {
  const state = {
    user,
  };
  const dispatch = jest.fn().mockImplementation();
  const section = 'skillsEdit';

  it('should delete skill', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <SkillsEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getAllByTestId('skill-delete-icon')[0]);
    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalledWith({
        type: userProfileAction.UPDATE_SKILLS,
        payload: user.userSkills,
      });
    });
  });

  it('should cancel edit mode', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <SkillsEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getByText('cancel'));
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: userProfileAction.CANCEL,
        payload: section,
      });
    });
  });

  it('should update skill', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <SkillsEdit />
      </UserProfileContext.Provider>,
    );

    const skillRating = screen.getAllByTestId('skill-rating')[0];
    userEvent.click(skillRating);
    userEvent.type(skillRating, '{arrowleft}{enter}');
    userEvent.click(await screen.findByTestId('skill-update-icon'));
    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalledWith({
        type: userProfileAction.UPDATE_SKILLS,
        payload: user.userSkills,
      });
    });
  });
});
