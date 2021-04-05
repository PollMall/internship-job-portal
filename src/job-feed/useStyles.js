import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  jobTitle: {
    textAlign: 'center',
  },

  progress: {
    display: 'block',
    margin: '0 auto',
    transform: 'scale(3)',
  },

  cardHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  jobCard: {
    maxWidth: 300,
    flexGrow: 1,
    margin: 12,
    '&:hover': {
      backgroundColor: '#f2f4f7',
    },
  },

  companyName: {
    marginBottom: 12,
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

export default useStyles;
