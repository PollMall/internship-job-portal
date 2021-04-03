import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicInfoEdit from './BasicInfoEdit';
import { UserProfileContext } from '../UserProfileProvider';
import { userProfileAction } from '../useUserProfile';
import { render } from '../../setupTests';
import { user } from '../../res/mockData';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: (query) => (
    [async ({ variables }) => {
      if (variables) {
        return {
          data: {
            updateUser: variables,
            updateContactInfo: variables,
          },
          query,
        };
      }
      throw new Error('error');
    }]
  ),
}));

describe('BasicInfoEdit tests', () => {
  const state = {
    user,
    basicInfoEdit: true,
  };
  const dispatch = jest.fn().mockImplementation();
  const section = 'basicInfoEdit';
  const firstName = 'a';
  const lastName = 'a';
  const about = 'a';
  const url = 'a';

  it('should cancel form', () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <BasicInfoEdit />
      </UserProfileContext.Provider>,
    );

    const cancel = screen.getByText(/cancel/i);
    userEvent.click(cancel);
    expect(dispatch).toHaveBeenCalledWith({ type: userProfileAction.CANCEL, payload: section });
  });

  it('should save form', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <BasicInfoEdit />
      </UserProfileContext.Provider>,
    );

    const save = screen.getByText(/save/i);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const aboutInput = screen.getByLabelText(/about/i);
    const urlInput = screen.getByLabelText(/photo url/i);
    userEvent.type(firstNameInput, firstName);
    userEvent.type(lastNameInput, lastName);
    userEvent.type(aboutInput, about);
    userEvent.type(urlInput, url);

    userEvent.click(save);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });

  it('should throw error', async () => {
    render(
      <UserProfileContext.Provider value={{ state: { user: undefined }, dispatch }}>
        <BasicInfoEdit />
      </UserProfileContext.Provider>,
    );

    const save = screen.getByText(/save/i);
    userEvent.click(save);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
