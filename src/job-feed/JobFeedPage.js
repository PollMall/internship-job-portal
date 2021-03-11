import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles, CircularProgress, Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../queries/JobQueries';
import Job from './Job';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  cardHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

function JobFeedPage({ errorAutoHide = 2500 }) {
  const history = useHistory();
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_JOBS);
  const [showError, setShowError] = useState(false);

  const memoJobs = React.useMemo(() => (data ? data.jobs.map((it) => <Job key={it.id} id={it.id} name={it.name} description={it.description} isAvailable={it.isAvailable} companyName={it.company.name} updatedAt={it.updatedAt} onClick={() => history.push(`/jobs/${it.id}`)} />) : <p>There are no jobs</p>), [data]);

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
      <h2 className={classes.title}>Jobs Page</h2>
      {loading && <CircularProgress className={classes.progress} color="inherit" />}
      <Snackbar data-testid="job-feed-error" open={showError} autoHideDuration={errorAutoHide} onClose={handleOnCloseSnackbar}>
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
