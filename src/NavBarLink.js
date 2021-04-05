import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },

  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

function NavBarLink({ children, to }) {
  const classes = useStyles();

  return (
    <NavLink exact className={classes.link} to={to}>
      {children}
    </NavLink>
  );
}

export default NavBarLink;
