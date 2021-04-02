import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Info from '../../Info';
import { GET_SKILLS, DELETE_USER_SKILL, UPDATE_USER_SKILL } from '../../queries/SkillQueries';
import NewSkill from './NewSkill';
import { UserProfileContext } from '../UserProfileProvider';
import { userProfileAction } from '../useUserProfile';
import SkillEdit from './SkillEdit';

function skillsEdit() {
  const { state, dispatch } = useContext(UserProfileContext);
  const { data, loading, error } = useQuery(GET_SKILLS);
  const [deleteUserSkillCall] = useMutation(DELETE_USER_SKILL);
  const [updateUserSkillCall] = useMutation(UPDATE_USER_SKILL);

  const onDeleteSkill = async (id) => {
    try {
      await deleteUserSkillCall({ variables: { id } });
      dispatch({
        type: userProfileAction.UPDATE_SKILLS,
        payload:
          state.user?.userSkills.filter((us) => us.id !== id),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  const onUpdateSkill = async (userSkill) => {
    try {
      await updateUserSkillCall({
        variables: {
          id: userSkill.id, userId: state.user?.id, skillId: userSkill.skill.id, rating: userSkill.rating,
        },
      });
      dispatch({
        type: userProfileAction.UPDATE_SKILLS,
        payload:
          Array.from(state.user?.userSkills, (us) => (
            us.id === userSkill.id ? { ...us, rating: userSkill.rating } : us
          )),
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  const memoSkills = React.useMemo(() => state.user?.userSkills?.map((us) => (
    <SkillEdit key={us.id} userSkill={us} onUpdate={onUpdateSkill} onDelete={onDeleteSkill} />
  )), [state.user?.userSkills]);

  const memoSelectSkills = React.useMemo(() => (
    data?.skills.map((s) => (
      { value: s, label: s.name }
    ))
  ), [data]);

  const onCancel = () => {
    dispatch({ type: userProfileAction.CANCEL, payload: 'skillsEdit' });
  };

  return (
    <>
      <Info loading={loading} error={!!error} />
      {memoSkills}
      <NewSkill skills={memoSelectSkills} userId={state.user?.id} dispatch={dispatch} />
      {/* <SectionActions section="skillsEdit" /> */}
      <Button variant="outlined" onClick={onCancel}>cancel</Button>
    </>
  );
}

export default skillsEdit;
