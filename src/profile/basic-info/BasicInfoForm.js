import React, { useState } from 'react';
import {
  TextField, Button, ButtonGroup,
} from '@material-ui/core';

function BasicInfoForm({ user: actualUser, onSave, onCancel }) {
  const [user, setUser] = useState(actualUser);

  const onSaveClick = () => {
    onSave(user);
    onCancel();
  };

  return (
    <form>
      <TextField
        fullWidth
        value={user?.firstName || ''}
        label="First name"
        name="firstName"
        id="firstName"
        onChange={(e) => (
          setUser({ ...user, firstName: e.target.value })
        )}
      />
      <TextField
        fullWidth
        value={user?.lastName || ''}
        label="Last name"
        name="lastName"
        id="lastName"
        onChange={(e) => (
          setUser({ ...user, lastName: e.target.value })
        )}
      />
      <TextField
        fullWidth
        value={user?.contactInfo?.about || ''}
        rowsMax={4}
        multiline
        label="About"
        name="about"
        id="about"
        onChange={(e) => (
          setUser({ ...user, contactInfo: { ...user.contactInfo, about: e.target.value } })
        )}
      />
      <TextField
        fullWidth
        value={user?.contactInfo?.avatarUrl || ''}
        label="Photo URL"
        name="photoUrl"
        id="photoUrl"
        onChange={(e) => (
          setUser({ ...user, contactInfo: { ...user.contactInfo, avatarUrl: e.target.value } })
        )}
      />
      <ButtonGroup size="small">
        <Button onClick={onSaveClick}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
}

export default BasicInfoForm;
