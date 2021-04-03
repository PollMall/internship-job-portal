import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { validateFields } from './utils';

function EducationEdit({ education: actualEducation, onDelete, onUpdate }) {
  const [education, setEducation] = useState({
    ...actualEducation,
    startDate: actualEducation.startDate
      ? new Date(parseInt(actualEducation?.startDate * 1000, 10)).toISOString().split('T')[0]
      : '',
    endDate: actualEducation.endDate
      ? new Date(parseInt(actualEducation?.endDate * 1000, 10)).toISOString().split('T')[0]
      : '',
  });
  const [valid, setValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  React.useEffect(() => {
    validateFields(education, setValid);
    setIsEdited(
      JSON.stringify({
        ...education,
        startDate: education?.startDate ? (new Date(education.startDate).valueOf() / 1000).toString() : '',
        endDate: education?.endDate ? (new Date(education.endDate).valueOf() / 1000).toString() : '',
      }) !== JSON.stringify(actualEducation),
    );
  }, [education]);

  const onDeleteClick = () => {
    onDelete(education?.id);
  };

  const onUpdateClick = () => {
    onUpdate(education);
  };

  return (
    <form>
      <TextField
        fullWidth
        value={education?.institution || ''}
        label="Institution"
        name="institution"
        id="institution"
        onChange={(e) => (
          setEducation({ ...education, institution: e.target.value })
        )}
      />
      <TextField
        fullWidth
        value={education?.description || ''}
        label="Description"
        name="description"
        id="description"
        multiline
        rowsMax={5}
        onChange={(e) => (
          setEducation({ ...education, description: e.target.value })
        )}
      />
      <TextField
        fullWidth
        type="date"
        value={education?.startDate}
        label="Start date"
        name="startDate"
        id="startDate"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => (
          setEducation({ ...education, startDate: e.target.value }))}
      />
      <TextField
        fullWidth
        type="date"
        value={education?.endDate}
        label="End date"
        name="endDate"
        id="endDate"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => (
          setEducation({ ...education, endDate: e.target.value }))}
      />
      <Button onClick={onUpdateClick} disabled={!valid || !isEdited}>
        <CheckIcon />
        save
      </Button>
      <Button onClick={onDeleteClick}>
        <DeleteIcon />
        delete
      </Button>
    </form>
  );
}

export default EducationEdit;
