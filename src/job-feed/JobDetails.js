import React from 'react';
import {
  Card, CardContent, CardActions, Typography, Button, Avatar,
} from '@material-ui/core';
import JobDetailsSection from './JobDetailsSection';
import useStyles from './useStyles';

function JobDetails({ job }) {
  const classes = useStyles();

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
          <JobDetailsSection
            fields={[
              {
                title: 'Description',
                data: [job.description],
                component: 'p',
              },
              {
                title: 'Contact info',
                data: [
                  `${job.company.user.firstName} ${job.company.user.lastName}`,
                  `Address: ${job.company.contactInfocity}, ${job.company.contactInfo.country.name}`,
                  `Email: ${job.company.contactInfo.email}`,
                  `Phone: ${job.company.contactInfo.phone}`,
                  `Website: ${job.company.contactInfo.website}`,
                ],
                component: 'p',
              },
              {
                title: 'About company',
                data: [job.company.contactInfo.about],
                component: 'p',
              },
            ]}
          />

          <JobDetailsSection
            fields={[
              {
                title: 'Required skills',
                data: job.jobSkills.map((js) => js.skill.name),
                component: 'li',
              },
              {
                title: 'Job requirements',
                data: job.jobRequirements.map((jr) => jr.name),
                component: 'li',
              },
              {
                title: 'Job benefits',
                data: job.jobBenefits.map((jb) => jb.name),
                component: 'li',
              },
            ]}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button size="large" variant="contained" fullWidth color="primary">Apply</Button>
      </CardActions>
    </Card>
  );
}

export default JobDetails;
