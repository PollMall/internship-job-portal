import React, { useContext } from 'react';
import {
  Grid, Avatar,
} from '@material-ui/core';
import { UserProfileContext } from '../UserProfileProvider';
import BasicInfoPreview from './BasicInfoPreview';
import BasicInfoEdit from './BasicInfoEdit';
import useStyles from '../useStyles';

function BasicInfo() {
  const { state, dispatch } = useContext(UserProfileContext);
  const classes = useStyles();

  return (
    <Grid item className={classes.section}>
      <Avatar
        className={classes.avatar}
        alt={state.user?.firstName}
        src={state.user?.contactInfo?.avatarUrl}
      />
      {state.basicInfoEdit
        ? (
          <BasicInfoEdit user={state.user} dispatch={dispatch} />
        )
        : (
          <BasicInfoPreview user={state.user} dispatch={dispatch} />
        )}
    </Grid>
  );
}

export default BasicInfo;
