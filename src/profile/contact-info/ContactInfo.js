import React, { useContext } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { UserProfileContext } from '../UserProfileProvider';
import ContactInfoPreview from './ContactInfoPreview';
import ContactInfoEdit from './ContactInfoEdit';
import useStyles from '../useStyles';
import Subtitle from '../Subtitle';

function ContactInfo() {
  const { state, dispatch } = useContext(UserProfileContext);
  const classes = useStyles();

  return (
    <Grid item className={classes.section}>
      <Subtitle text="contact info" section="contactInfoEdit" dispatch={dispatch} />
      {state.contactInfoEdit
        ? (
          <ContactInfoEdit />
        )
        : (
          <ContactInfoPreview contactInfo={state.user?.contactInfo} />
        )}
    </Grid>
  );
}

export default ContactInfo;
