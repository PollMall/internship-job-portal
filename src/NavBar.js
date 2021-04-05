import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Button, Typography, makeStyles, IconButton, Tooltip,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { userAction } from './useUser';
import NavBarLink from './NavBarLink';
import { UserContext } from './UserProvider';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },

  menu: {
    textTransform: 'capitalize',
    maxWidth: 300,
  },
}));

function NavBar() {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = React.useCallback(() => {
    dispatch({ type: userAction.LOGOUT });
  });

  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavBarLink to="/home">
          <Tooltip title="Home">
            <IconButton color="inherit" edge="start">
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </NavBarLink>
        <Typography data-testid="navbar--header-message" variant="h6" className={classes.title}>
          Hello
          {state.user && `, ${state.user.username}`}
        </Typography>
        {state.user && (
        <>
          {state.user.userRole?.name === 'user' && (
          <NavBarLink to="/profile">
            <Button data-testid="navbar--profile-btn" color="inherit">my profile</Button>
          </NavBarLink>
          )}
          <Button data-testid="navbar--logout-btn" color="inherit" onClick={handleLogout}>logout</Button>
        </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
