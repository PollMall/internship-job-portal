import React, { useContext } from 'react';
import {
  Divider,
  Grid, Typography,
} from '@material-ui/core';
import { UserProfileContext } from './UserProfileProvider';
import ContactInfo from './contact-info';
import Skills from './skills';
import Educations from './educations';
import WorkExperiences from './work-experiences';
import BasicInfo from './basic-info';

function UserProfile() {
  const { state } = useContext(UserProfileContext);

  return (
    <Grid container cols={12} spacing={3}>
      <Grid container item xs={4} direction="column" spacing={1}>
        <BasicInfo />
        <Divider />
        <ContactInfo />
        <Divider />
        <Skills />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid container item xs={8} direction="column" spacing={1}>
        <Educations />
        <Divider />
        <WorkExperiences />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          {`Last updated on ${new Date(state.user?.updatedAt * 1000).toLocaleDateString('en-US')}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
