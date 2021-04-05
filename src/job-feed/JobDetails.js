import React, { useContext, useState } from 'react';
import {
  Card, CardContent, CardActions, Typography, Button, Avatar,
} from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_JOB_APPLICATION, GET_JOB_APPLICATIONS } from '../queries/JobQueries';
import JobDetailsSection from './JobDetailsSection';
import useStyles from './useStyles';
import makeSectionFields from './helper';
import { UserContext } from '../UserProvider';
import Info from '../Info';

function JobDetails({ job }) {
  const classes = useStyles();
  const fields = makeSectionFields(job);
  const { state } = useContext(UserContext);
  const [createUserJobApplicationCall,
    { error: createApplicationError, loading: createApplicationLoading }] = useMutation(CREATE_JOB_APPLICATION);
  const {
    data, loading, error,
  } = useQuery(GET_JOB_APPLICATIONS, { fetchPolicy: 'cache-and-network' });
  const [applied, setApplied] = useState(false);

  React.useEffect(() => {
    setApplied(!!data?.userJobApplications.filter((d) => (
      d.job?.id === job.id && d.user?.id === state.user?.id
    )).length);
  }, [data]);

  const onApply = async () => {
    try {
      await createUserJobApplicationCall({ variables: { userId: state.user?.id, jobId: job.id } });
      setApplied(true);
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <>
      <Info loading={loading || createApplicationLoading} error={!!error || !!createApplicationError} />
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
            {fields.map((f) => <JobDetailsSection key={f.id} fields={f.fields} />)}
          </div>
        </CardContent>
        <CardActions>
          <Button
            disabled={applied}
            onClick={onApply}
            size="large"
            variant="contained"
            fullWidth
            color="primary"
          >
            {applied
              ? 'You have applied to this job'
              : 'Apply'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default JobDetails;
