import React, { useContext } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { UserProfileContext } from '../UserProfileProvider';
import useStyles from '../useStyles';
import Subtitle from '../Subtitle';
import WorkExperiencesPreview from './WorkExperiencesPreview';
import WorkExperiencesEdit from './WorkExperiencesEdit';

function WorkExperiences() {
  const { state, dispatch } = useContext(UserProfileContext);
  const classes = useStyles();

  return (
    <Grid item className={classes.section}>
      <Subtitle text="work experiences" section="workExperiencesEdit" dispatch={dispatch} />
      { state.workExperiencesEdit
        ? (
          <WorkExperiencesEdit />
        )
        : (
          <WorkExperiencesPreview workExperiences={state.user?.userWorkExperiences} />
        )}
    </Grid>
  );
}

export default WorkExperiences;
