import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../queries/UserQueries';
import { UPDATE_CONTACT_INFO } from '../../queries/ContactInfoQueries';
import { userProfileAction } from '../useUserProfile';
import BasicInfoForm from './BasicInfoForm';

function BasicInfoEdit({ user: actualUser, dispatch }) {
  const [updateUserCall] = useMutation(UPDATE_USER);
  const [updateContactInfoCall] = useMutation(UPDATE_CONTACT_INFO);

  const onSave = React.useCallback(async (user) => {
    try {
      const { data: userData } = await updateUserCall({ variables: user });
      const { data: contactInfoData } = await updateContactInfoCall({
        variables: {
          id: user?.contactInfo?.id,
          about: user?.contactInfo?.about,
          avatarUrl: user?.contactInfo?.avatarUrl,
        },
      });
      dispatch({ type: userProfileAction.UPDATE_USER, payload: userData.updateUser });
      dispatch({
        type: userProfileAction.UPDATE_CONTACT_INFO,
        payload: contactInfoData.updateContactInfo,
      });
    } catch (ex) {
      console.error(ex);
    }
  }, []);

  const onCancel = React.useCallback(() => {
    dispatch({ type: userProfileAction.CANCEL, payload: 'basicInfoEdit' });
  }, []);

  return (
    <BasicInfoForm user={actualUser} onSave={onSave} onCancel={onCancel} />
  );
}

export default BasicInfoEdit;
