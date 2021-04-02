import React, { useContext } from 'react';
import {
  Grid,
} from '@material-ui/core';
import useStyles from '../useStyles';
import Subtitle from '../Subtitle';
import SkillsEdit from './SkillsEdit';
import SkillsPreview from './SkillsPreview';
import { UserProfileContext } from '../UserProfileProvider';

function Skills() {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserProfileContext);

  return (
    <Grid item className={classes.section}>
      <Subtitle text="skills" section="skillsEdit" dispatch={dispatch} />
      {state.skillsEdit
        ? (
          <SkillsEdit />
        )
        : (
          <SkillsPreview skills={state.user?.userSkills} />
        )}
    </Grid>
  );
}

export default Skills;
