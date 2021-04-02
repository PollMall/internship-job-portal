import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from '../useStyles';
import Subtitle from '../Subtitle';

function BasicInfoPreview({ user, dispatch }) {
  const classes = useStyles();

  return (
    <Grid item className={classes.section}>
      <Subtitle text={`${user?.firstName} ${user?.lastName}`} section="basicInfoEdit" dispatch={dispatch} />
      <Typography variant="body1">{user?.contactInfo?.about}</Typography>
    </Grid>
  );
}

export default BasicInfoPreview;
