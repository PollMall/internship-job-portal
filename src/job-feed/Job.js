import React from 'react';
import {
  Card, makeStyles, Typography, CardContent,
} from '@material-ui/core';

const useStyles = (isAvailable) => makeStyles({
  root: {
    minWidth: 275,
    margin: 12,
    backgroundColor: isAvailable ? 'initial' : 'indianred',
    opacity: isAvailable ? 1 : 0.5,
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

function Job({
  name, description, isAvailable, companyName, updatedAt,
}) {
  const classes = useStyles(isAvailable)();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {isAvailable ? 'Available' : 'Unavailable'}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {companyName}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          {`Last updated on: ${new Date(updatedAt).toLocaleDateString()}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Job;
