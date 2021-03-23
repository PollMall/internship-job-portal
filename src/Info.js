import React from 'react';
import { CircularProgress, Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  progress: {
    display: 'block',
    margin: '0 auto',
    transform: 'scale(3)',
  },
});

function Info({ loading, error, errorAutoHide = 2500 }) {
  const [showError, setShowError] = React.useState(error);
  const classes = useStyles();

  const handleOnCloseSnackbar = React.useCallback(() => {
    setShowError(false);
  }, []);

  return (
    <>
      {loading && <CircularProgress className={classes.progress} color="inherit" />}
      <Snackbar
        data-testid="job-feed-error"
        open={showError}
        autoHideDuration={errorAutoHide}
        onClose={handleOnCloseSnackbar}
      >
        <Alert severity="error" data-testid="info-error">
          An error occured!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Info;
