import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Button, Typography, makeStyles,
} from '@material-ui/core';
import { userAction } from './useUser';

import { UserContext } from './UserProvider';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();
  const [state, dispatch] = useContext(UserContext);
  const handleLogout = React.useCallback(() => {
    dispatch({ type: userAction.LOGOUT });
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography data-testid="navbar--header-message" variant="h6" className={classes.title}>
          Hello
          {state.user && `, ${state.user.username}`}
        </Typography>
        {state.user && <Button data-testid="navbar--logout-btn" color="inherit" onClick={handleLogout}>logout</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
