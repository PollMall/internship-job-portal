import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicInfoEdit from './BasicInfoEdit';
import { UserProfileContext } from '../UserProfileProvider';
import { userProfileAction } from '../useUserProfile';
import { render } from '../../setupTests';
import { updateContactInfo, updateUser } from '../../res/mockCalls';
import { user } from '../../res/mockData';
import { makeMock, mockResponseType } from '../../queries/MockApollo';

describe('UserProfile tests', () => {
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
  const updateUserVariables = {
    ...user,
    firstName,
    lastName,
  };
  const updateContactInfoVariables = {
    id: user.contactInfo.id,
    about,
    avatarUrl: url,
  };

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

  it('should save form', () => {
    const userMockData = updateUser(updateUserVariables);
    const contactInfoMockData = updateContactInfo(updateContactInfoVariables);
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <BasicInfoEdit />
      </UserProfileContext.Provider>,
      [makeMock(userMockData, mockResponseType.SUCCESS), makeMock(contactInfoMockData, mockResponseType.SUCCESS)],
    );

    console.log(userMockData);
    console.log(contactInfoMockData);

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
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
