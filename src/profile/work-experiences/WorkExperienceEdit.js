import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { validateFields } from './utils';

function WorkExperienceEdit({ workExperience: experience, onDelete, onUpdate }) {
  const [workExperience, setWorkExperience] = useState({
    ...experience,
    startDate: experience.startDate
      ? new Date(parseInt(experience.startDate * 1000, 10)).toISOString().split('T')[0]
      : '',
    endDate: experience.endDate
      ? new Date(parseInt(experience.endDate * 1000, 10)).toISOString().split('T')[0]
      : '',
  });
  const [valid, setValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  React.useEffect(() => {
    validateFields(workExperience, setValid);
    setIsEdited(JSON.stringify(workExperience) !== JSON.stringify(experience));
  }, [workExperience]);

  const onDeleteClick = () => {
    onDelete(workExperience.id);
  };

  const onUpdateClick = () => {
    onUpdate(workExperience);
  };

  return (
    <form>
      <TextField
        fullWidth
        value={workExperience?.institution || ''}
        label="Institution"
        name="institution"
        id="institution"
        onChange={(e) => (
          setWorkExperience({ ...workExperience, institution: e.target.value })
        )}
      />
      <TextField
        fullWidth
        value={workExperience?.description || ''}
        label="Description"
        name="description"
        id="description"
        multiline
        rowsMax={5}
        onChange={(e) => (
          setWorkExperience({ ...workExperience, description: e.target.value })
        )}
      />
      <TextField
        fullWidth
        type="date"
        value={workExperience.startDate}
        label="Start date"
        name="startDate"
        id="startDate"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => (
          setWorkExperience({ ...workExperience, startDate: e.target.value }))}
      />
      <TextField
        fullWidth
        type="date"
        value={workExperience.endDate}
        label="End date"
        name="endDate"
        id="endDate"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => (
          setWorkExperience({ ...workExperience, endDate: e.target.value }))}
      />
      {isEdited && (
      <Button onClick={onUpdateClick} disabled={!valid}>
        <CheckIcon />
        save
      </Button>
      )}
      <Button onClick={onDeleteClick}>
        <DeleteIcon />
        delete
      </Button>
    </form>
  );
}

export default WorkExperienceEdit;
