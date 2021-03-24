import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  progress: {
    display: 'block',
    margin: '0 auto',
    transform: 'scale(3)',
  },

  pageTitle: {
    textAlign: 'center',
    margin: 16,
  },

  tableHead: {
    backgroundColor: 'lightgrey',
  },

  tableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#EEE',
    },
  },

  table: {
    maxWidth: '90%',
    margin: '64px auto',
  },

  modal: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: 'fit-content',
    height: 'fit-content',
    borderRadius: 10,
    padding: 16,
    animation: '$slide 300ms',
  },

  '@keyframes slide': {
    from: {
      top: -500,
    },
    to: {
      top: 16,
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: 8,
      width: 256,
    },
  },

  fab: {
    position: 'fixed',
    right: 16,
    bottom: 16,
  },
});

export default useStyles;
