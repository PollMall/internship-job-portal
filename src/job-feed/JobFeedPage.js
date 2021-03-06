import React, { useState } from 'react';
import {
  CircularProgress, Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../queries/JobQueries';
import Job from './Job';
import useStyles from './useStyles';

function JobFeedPage({ errorAutoHide = 2500 }) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_JOBS);
  const [showError, setShowError] = useState(false);

  const memoJobs = React.useMemo(() => (
    data?.jobs
      ?.filter((it) => it.isAvailable)
      .sort((j1, j2) => j2.updatedAt - j1.updatedAt)
      .map((it) => <Job key={it.id} job={it} />)
  ), [data?.jobs]);

  const handleOnCloseSnackbar = React.useCallback(() => {
    setShowError(false);
  });

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className={classes.root}>
      <h2 className={classes.jobTitle}>Jobs Page</h2>
      {loading && <CircularProgress className={classes.progress} color="inherit" />}
      <Snackbar
        data-testid="job-feed-error"
        open={showError}
        autoHideDuration={errorAutoHide}
        onClose={handleOnCloseSnackbar}
      >
        <Alert severity="error">
          An error occured!
        </Alert>
      </Snackbar>
      {data && (
        <div data-testid="job-feed-data" className={classes.cardHolder}>
          {memoJobs}
        </div>
      )}
    </div>
  );
}

export default JobFeedPage;
