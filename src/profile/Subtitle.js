import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './useStyles';
import { userProfileAction } from './useUserProfile';

function Subtitle({
  text, section, dispatch, ...props
}) {
  const [isHover, setIsHover] = useState(false);
  const classes = useStyles();

  const onClick = () => {
    dispatch({ type: userProfileAction.EDIT, payload: section });
  };

  return (
    <Typography
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={classes.subtitle}
      variant="h4"
      {...props}
    >
      {text}
      {isHover && <EditIcon data-testid="subtitle-icon" />}
    </Typography>
  );
}

export default Subtitle;
