import React, { useContext } from 'react';
import { Button, Paper } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import EducationEdit from './EducationEdit';
import NewEducation from './NewEducation';
import useStyles from '../useStyles';
import { UserProfileContext } from '../UserProfileProvider';
import { userProfileAction } from '../useUserProfile';
import { DELETE_USER_EDUCATION, UPDATE_USER_EDUCATION } from '../../queries/EducationQueries';

function EducationsEdit() {
  const { state, dispatch } = useContext(UserProfileContext);
  const [deleteUserEducationCall] = useMutation(DELETE_USER_EDUCATION);
  const [updateUserEducationCall] = useMutation(UPDATE_USER_EDUCATION);
  const classes = useStyles();

  const onCancel = () => {
    dispatch({ type: userProfileAction.CANCEL, payload: 'educationsEdit' });
  };

  const onDelete = async (id) => {
    try {
      await deleteUserEducationCall({ variables: { id } });
      dispatch({
        type: userProfileAction.UPDATE_EDUCATIONS,
        payload: state.user?.userEducations.filter((ue) => ue.id !== id),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  const onUpdate = async (education) => {
    try {
      const { data } = await updateUserEducationCall({
        variables:
        { ...education, userId: state.user?.id },
      });
      dispatch({
        type: userProfileAction.UPDATE_EDUCATIONS,
        payload:
          Array.from(state.user?.userEducations, (ue) => (
            ue.id === education.id ? { ...data.updateUserEducation } : ue
          )),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <>
      {state.user?.userEducations?.map((e) => (
        <Paper key={e.id} className={classes.subsection}>
          <EducationEdit education={e} onDelete={onDelete} onUpdate={onUpdate} />
        </Paper>
      ))}
      <Paper className={classes.subsection}>
        <NewEducation userId={state.user?.id} dispatch={dispatch} />
      </Paper>
      <Button variant="outlined" onClick={onCancel}>cancel</Button>
    </>
  );
}

export default EducationsEdit;
