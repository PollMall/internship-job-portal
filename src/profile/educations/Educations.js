import React, { useContext } from 'react';
import {
  Grid,
} from '@material-ui/core';
import { UserProfileContext } from '../UserProfileProvider';
import useStyles from '../useStyles';
import Subtitle from '../Subtitle';
import EducationsPreview from './EducationsPreview';
import EducationsEdit from './EducationsEdit';

function Educations() {
  const { state, dispatch } = useContext(UserProfileContext);
  const classes = useStyles();

  return (
    <Grid item className={classes.section}>
      <Subtitle text="educations" section="educationsEdit" dispatch={dispatch} />
      { state.educationsEdit
        ? (
          <EducationsEdit user={state.user} dispatch={dispatch} />
        )
        : (
          <EducationsPreview educations={state.user?.userEducations} />
        )}
    </Grid>
  );
}

export default Educations;
