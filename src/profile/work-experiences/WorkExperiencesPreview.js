import React from 'react';
import {
  Typography, Paper,
} from '@material-ui/core';
import useStyles from '../useStyles';

function WorkExperiencesPreview({ workExperiences }) {
  const classes = useStyles();

  return (
    <>
      {workExperiences?.map((we) => (
        <Paper key={we.id} className={classes.subsection}>
          <Typography variant="h6" component="h5">{we.institution}</Typography>
          <Typography variant="body2" component="h5">{we.description}</Typography>
          <Typography variant="body2" component="span">
            {new Date(parseInt(we.startDate, 10) * 1000).toLocaleDateString()}
          </Typography>
          -
          <Typography variant="body2" component="span">
            {we.endDate === '0' ? 'Current' : new Date(parseInt(we.endDate, 10) * 1000).toLocaleDateString()}
          </Typography>
        </Paper>
      ))}
    </>
  );
}

export default WorkExperiencesPreview;
