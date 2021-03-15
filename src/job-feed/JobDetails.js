import React from 'react';
import {
  Card, CardContent, CardActions, Typography, Button, Avatar,
} from '@material-ui/core';
import JobDetailsSection from './JobDetailsSection';
import useStyles from './useStyles';
import makeSectionFields from './helper';

function JobDetails({ job }) {
  const classes = useStyles();
  const fields = makeSectionFields(job);

  return (
    <Card data-testid="job-details-data">
      <CardContent>
        <Typography variant="h3">
          {job.name}
        </Typography>
        <div className={classes.companyLogo}>
          <Avatar alt={job.company.name} src={job.company.contactInfo.avatarUrl} />
          <Typography color="textSecondary">
            {job.company.name}
          </Typography>
        </div>

        <div className={classes.content}>
          {fields.map((f) => <JobDetailsSection fields={f} />)}
        </div>
      </CardContent>
      <CardActions>
        <Button size="large" variant="contained" fullWidth color="primary">Apply</Button>
      </CardActions>
    </Card>
  );
}

export default JobDetails;
