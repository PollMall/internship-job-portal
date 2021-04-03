import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactInfoEdit from './ContactInfoEdit';
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
            createContactInfo: variables,
            updateContactInfo: variables,
          },
          query,
        };
      }
      throw new Error('error');
    }]
  ),
  useQuery: (query) => (
    {
      data: {
        counties: [{
          id: 1,
          name: 'country',
        }],
      },
      loading: false,
      error: undefined,
      query,
    }
  ),
}));

describe('ContactInfoForm tests', () => {
  const state = {
    user,
  };
  const dispatch = jest.fn().mockImplementation();
  const section = 'contactInfoEdit';

  it('should cancel form', () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <ContactInfoEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getByText(/cancel/i));
    expect(dispatch).toHaveBeenCalledWith({ type: userProfileAction.CANCEL, payload: section });
  });

  it('should create contact info', async () => {
    render(
      <UserProfileContext.Provider value={{ state, dispatch }}>
        <ContactInfoEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.type(screen.getByLabelText(/email/i), user.contactInfo.email);
    userEvent.type(screen.getByLabelText(/phone/i), user.contactInfo.phone);
    userEvent.type(screen.getByLabelText(/city/i), user.contactInfo.city);
    userEvent.type(screen.getByLabelText(/country/i), `${user.contactInfo.country.name}{enter}`);
    userEvent.type(screen.getByLabelText(/website/i), user.contactInfo.website);
    userEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  it('should update contact info', async () => {
    render(
      <UserProfileContext.Provider value={{ state: { user: {} }, dispatch }}>
        <ContactInfoEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.type(screen.getByLabelText(/email/i), user.contactInfo.email);
    userEvent.type(screen.getByLabelText(/phone/i), user.contactInfo.phone);
    userEvent.type(screen.getByLabelText(/city/i), user.contactInfo.city);
    userEvent.type(screen.getByLabelText(/country/i), `${user.contactInfo.country.name}{enter}`);
    userEvent.type(screen.getByLabelText(/website/i), user.contactInfo.website);
    userEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  it('should throw error', async () => {
    render(
      <UserProfileContext.Provider value={{ state: { user: {} }, dispatch }}>
        <ContactInfoEdit />
      </UserProfileContext.Provider>,
    );

    userEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
