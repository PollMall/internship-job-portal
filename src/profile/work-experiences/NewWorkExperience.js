import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_WORK_EXPERIENCE } from '../../queries/WorkExperienceQueries';
import { validateFields } from './utils';
import { userProfileAction } from '../useUserProfile';

function NewWorkExperience({ userId, dispatch }) {
  const [add, setAdd] = useState(false);
  const [workExperience, setWorkExperience] = useState({});
  const [createUserWorkExperienceCall] = useMutation(CREATE_USER_WORK_EXPERIENCE);

  React.useEffect(() => {
    validateFields(workExperience, setAdd);
  }, [workExperience]);

  const onAddWorkExperience = async () => {
    setAdd(false);
    try {
      const { data } = await createUserWorkExperienceCall({
        variables: {
          ...workExperience,
          userId,
          startDate: workExperience.startDate,
          endDate: workExperience.endDate,
        },
      });
      dispatch({ type: userProfileAction.ADD_WORK_EXPERIENCE, payload: data.createUserWorkExperience });
      setWorkExperience({});
    } catch (ex) {
      console.error(ex);
    }
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
        value={workExperience?.startDate || ''}
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
        value={workExperience?.endDate || ''}
        label="End date"
        name="endDate"
        id="endDate"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => (
          setWorkExperience({ ...workExperience, endDate: e.target.value }))}
      />
      <Button disabled={!add} onClick={onAddWorkExperience}>Add work experience</Button>
    </form>
  );
}

export default NewWorkExperience;
