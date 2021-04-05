import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_EDUCATION } from '../../queries/EducationQueries';
import { validateFields } from './utils';
import { userProfileAction } from '../useUserProfile';

function NewEducation({ userId, dispatch }) {
  const [add, setAdd] = useState(false);
  const [education, setEducation] = useState({});
  const [createUserEducationCall] = useMutation(CREATE_USER_EDUCATION);

  React.useEffect(() => {
    validateFields(education, setAdd);
  }, [education]);

  const onAddEducation = async () => {
    setAdd(false);
    try {
      const { data } = await createUserEducationCall({
        variables: {
          ...education,
          userId,
          startDate: education.startDate,
          endDate: education.endDate,
        },
      });
      dispatch({ type: userProfileAction.ADD_EDUCATION, payload: data.createUserEducation });
      setEducation({});
    } catch (ex) {
      console.error(ex);
    }
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
        value={education?.startDate || ''}
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
        value={education?.endDate || ''}
        label="End date"
        name="endDate"
        id="endDate"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => (
          setEducation({ ...education, endDate: e.target.value }))}
      />
      <Button disabled={!add} onClick={onAddEducation}>Add education</Button>
    </form>
  );
}

export default NewEducation;
