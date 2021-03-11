import React from 'react';
import {
  Card, CardContent, CardActions, Typography, makeStyles, Button, Avatar,
} from '@material-ui/core';
import JobDetailsSection from './JobDetailsSection';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 12,
  },
  title: {
    fontSize: 12,
  },

  companyName: {
    marginLeft: 4,
  },

  companyLogo: {
    display: 'flex',
    alignItems: 'center',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      width: 300,
    },
  },
});

function JobDetails({
  name, description, companyName, companyUser, email, phone, city, country, website, avatarUrl, aboutCompany, jobSkills, jobRequirements, jobBenefits,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} data-testid="job-details-data">
      <CardContent>
        <Typography variant="h3">
          {name}
        </Typography>
        <div className={classes.companyLogo}>
          <Avatar alt={companyName} src={avatarUrl} />
          <Typography className={classes.companyName} color="textSecondary">
            {companyName}
          </Typography>
        </div>

        <div className={classes.content}>
          <JobDetailsSection
            fields={[
              {
                title: 'Description',
                data: [description],
                component: 'p',
              },
              {
                title: 'Contact info',
                data: [
                  `${companyUser.firstName} ${companyUser.lastName}`,
                  `Address: ${city}, ${country}`,
                  `Email: ${email}`,
                  `Phone: ${phone}`,
                  `Website: ${website}`,
                ],
                component: 'p',
              },
              {
                title: 'About company',
                data: [aboutCompany],
                component: 'p',
              },
            ]}
          />

          <JobDetailsSection
            fields={[
              {
                title: 'Required skills',
                data: jobSkills.map((js) => js.skill.name),
                component: 'li',
              },
              {
                title: 'Job requirements',
                data: jobRequirements.map((jr) => jr.name),
                component: 'li',
              },
              {
                title: 'Job benefits',
                data: jobBenefits.map((jb) => jb.name),
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
