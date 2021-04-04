import React from 'react';
import {
  Typography, Paper,
} from '@material-ui/core';
import useStyles from '../useStyles';

function EducationsPreview({ educations }) {
  const classes = useStyles();

  return (
    <>
      {educations?.map((ue) => (
        <Paper key={ue.id} className={classes.subsection}>
          <Typography variant="h6" component="h5">{ue.institution}</Typography>
          <Typography variant="body2" component="h5">{ue.description}</Typography>
          <Typography variant="body2" component="span">
            {new Date(parseInt(ue.startDate, 10) * 1000).toLocaleDateString()}
          </Typography>
          -
          <Typography variant="body2" component="span">
            {ue.endDate === '0' ? 'Current' : new Date(parseInt(ue.endDate, 10) * 1000).toLocaleDateString()}
          </Typography>
        </Paper>
      ))}
    </>
  );
}

export default EducationsPreview;
