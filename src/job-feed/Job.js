import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, makeStyles, Typography, CardContent,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 12,
    '&:hover': {
      backgroundColor: '#f2f4f7',
    },
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

function Job({ job }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root} onClick={() => history.push(`/jobs/${job.id}`)}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {job.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
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
