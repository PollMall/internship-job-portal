import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CONTACT_INFO, CREATE_CONTACT_INFO } from '../../queries/ContactInfoQueries';
import { UPDATE_USER } from '../../queries/UserQueries';
import { userProfileAction } from '../useUserProfile';
import ContactInfoForm from './ContactInfoForm';

function ContactInfoEdit({ user, dispatch }) {
  const [updateContactInfoCall] = useMutation(UPDATE_CONTACT_INFO);
  const [createContactInfoCall] = useMutation(CREATE_CONTACT_INFO);
  const [updateUserCall] = useMutation(UPDATE_USER);

  const onCancel = React.useCallback(() => {
    dispatch({ type: userProfileAction.CANCEL, payload: 'contactInfoEdit' });
  }, []);

  const onSave = React.useCallback(async (contactInfo) => {
    const variables = { ...contactInfo, countryId: contactInfo?.country?.id };
    try {
      let newContactInfo;
      if (contactInfo?.id) {
        newContactInfo = (await updateContactInfoCall({ variables })).data.updateContactInfo;
      } else {
        newContactInfo = (await createContactInfoCall({ variables })).data.createContactInfo;
        await updateUserCall({ variables: { ...user, contactInfoId: newContactInfo.id } });
      }
      dispatch({
        type: userProfileAction.UPDATE_CONTACT_INFO,
        payload: newContactInfo,
      });
    } catch (ex) {
      console.error(ex);
    }
  }, [user?.contactInfo]);

  return (
    <ContactInfoForm contactInfo={user?.contactInfo} onSave={onSave} onCancel={onCancel} />
  );
}

export default ContactInfoEdit;
