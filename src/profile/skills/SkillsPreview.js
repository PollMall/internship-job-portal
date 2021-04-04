import React from 'react';
import {
  Typography, LinearProgress,
} from '@material-ui/core';
import useStyles from '../useStyles';

function SkillsPreview({ skills }) {
  const classes = useStyles();

  return (
    <>
      {skills?.map((us) => (
        <div key={us.id}>
          <Typography component="li">
            {us.skill?.name}
          </Typography>
          <LinearProgress
            className={classes.progressBar}
            variant="determinate"
            value={us.rating * 20}
          />
        </div>
      ))}
    </>
  );
}

export default SkillsPreview;
