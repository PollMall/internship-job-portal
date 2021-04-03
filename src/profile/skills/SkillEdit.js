import React, { useState } from 'react';
import {
  Typography, Slider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from '../useStyles';

function SkillEdit({
  userSkill, onUpdate, onDelete,
}) {
  const classes = useStyles();
  const [changed, setChanged] = useState(false);
  const [newUserSkill, setNewUserSkill] = useState(userSkill);

  const onChange = (e, value) => {
    setChanged(true);
    setNewUserSkill((prev) => ({ ...prev, rating: value }));
  };

  const onUpdateClick = () => {
    onUpdate(newUserSkill);
    setChanged(false);
  };

  return (
    <div>
      <Typography component="li">
        {userSkill.skill.name}
        {changed
        && (
        <CheckIcon
          data-testid="skill-update-icon"
          fontSize="small"
          className={classes.icon}
          onClick={onUpdateClick}
        />
        )}
        <DeleteIcon
          data-testid="skill-delete-icon"
          fontSize="small"
          className={classes.icon}
          onClick={() => onDelete(userSkill.id)}
        />
      </Typography>
      <Slider
        data-testid="skill-rating"
        onChange={onChange}
        key={userSkill.id}
        valueLabelDisplay="auto"
        value={newUserSkill?.rating || 1}
        marks
        min={1}
        max={5}
      />
    </div>
  );
}

export default SkillEdit;
