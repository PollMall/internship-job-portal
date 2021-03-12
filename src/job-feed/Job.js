import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Typography, CardContent,
} from '@material-ui/core';
import useStyles from './useStyles';

function Job({ job }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.jobCard} onClick={() => history.push(`/jobs/${job.id}`)}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {job.name}
        </Typography>
        <Typography className={classes.companyName} color="textSecondary">
          {job.company.name}
        </Typography>
        <Typography variant="body2" component="p">
          {job.description}
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          {`Last updated on: ${new Date(job.updatedAt).toLocaleDateString()}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Job;
