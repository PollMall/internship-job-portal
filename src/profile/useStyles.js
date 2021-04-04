import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  subtitle: {
    margin: 16,
    textTransform: 'capitalize',
    cursor: 'pointer',
    width: 'fit-content',
  },

  icon: {
    cursor: 'pointer',
  },

  section: {
    display: 'block',
    margin: '16px',
  },

  subsection: {
    padding: 16,
    margin: '16px 0',
  },

  avatar: {
    width: 200,
    height: 200,
    margin: '16px auto',
  },

  editButton: {
    backgroundColor: 'lightgreen',
    position: 'fixed',
    bottom: 16,
    right: 16,
  },

  progressBar: {
    height: 16,
    borderRadius: 10,
    width: '80%',
  },
});

export default useStyles;
