import React, { useContext } from 'react';
import { Button, Paper } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import WorkExperienceEdit from './WorkExperienceEdit';
import NewWorkExperience from './NewWorkExperience';
import useStyles from '../useStyles';
import { UserProfileContext } from '../UserProfileProvider';
import { userProfileAction } from '../useUserProfile';
import { DELETE_USER_WORK_EXPERIENCE, UPDATE_USER_WORK_EXPERIENCE } from '../../queries/WorkExperienceQueries';

function WorkExperiencesEdit() {
  const { state, dispatch } = useContext(UserProfileContext);
  const [deleteUserWorkExperienceCall] = useMutation(DELETE_USER_WORK_EXPERIENCE);
  const [updateUserWorkExperienceCall] = useMutation(UPDATE_USER_WORK_EXPERIENCE);
  const classes = useStyles();

  const onCancel = () => {
    dispatch({ type: userProfileAction.CANCEL, payload: 'workExperiencesEdit' });
  };

  const onDelete = async (id) => {
    try {
      await deleteUserWorkExperienceCall({ variables: { id } });
      dispatch({
        type: userProfileAction.UPDATE_WORK_EXPERIENCES,
        payload: state.user?.userWorkExperiences.filter((we) => we.id !== id),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  const onUpdate = async (workExperience) => {
    try {
      const { data } = await updateUserWorkExperienceCall({
        variables:
        { ...workExperience, userId: state.user?.id },
      });
      dispatch({
        type: userProfileAction.UPDATE_WORK_EXPERIENCES,
        payload:
          Array.from(state.user?.userWorkExperiences, (we) => (
            we.id === workExperience.id ? { ...data.updateUserWorkExperience } : we
          )),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <>
      {state.user?.userWorkExperiences?.map((we) => (
        <Paper key={we.id} className={classes.subsection}>
          <WorkExperienceEdit workExperience={we} onDelete={onDelete} onUpdate={onUpdate} />
        </Paper>
      ))}
      <Paper className={classes.subsection}>
        <NewWorkExperience userId={state.user?.id} dispatch={dispatch} />
      </Paper>
      <Button variant="outlined" onClick={onCancel}>cancel</Button>
    </>
  );
}

export default WorkExperiencesEdit;
