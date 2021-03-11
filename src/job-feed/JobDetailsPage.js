import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Snackbar, CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { GET_JOB } from '../queries/JobQueries';
import JobDetails from './JobDetails';

function JobDetailsPage({ errorAutoHide = 2500 }) {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_JOB, { variables: { id: parseInt(id, 10) } });
  const [showError, setShowError] = useState(false);

  const handleOnCloseSnackbar = React.useCallback(() => {
    setShowError(false);
  });

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div>
      {loading && <CircularProgress color="inherit" />}
      <Snackbar data-testid="job-details-error" open={showError} autoHideDuration={errorAutoHide} onClose={handleOnCloseSnackbar}>
        <Alert severity="error">
          An error occured!
        </Alert>
      </Snackbar>
      {data
      && (
      <JobDetails
        name={data.job.name}
        description={data.job.description}
        companyName={data.job.company.name}
        companyUser={data.job.company.user}
        email={data.job.company.contactInfo.email}
        phone={data.job.company.contactInfo.phone}
        city={data.job.company.contactInfo.city}
        country={data.job.company.contactInfo.country.name}
        website={data.job.company.contactInfo.website}
        avatarUrl={data.job.company.contactInfo.avatarUrl}
        aboutCompany={data.job.company.contactInfo.about}
        jobSkills={data.job.jobSkills}
        jobRequirements={data.job.jobRequirements}
        jobBenefits={data.job.jobBenefits}
      />
      )}
    </div>
  );
}

export default JobDetailsPage;
