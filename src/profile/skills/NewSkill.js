import React, { useState } from 'react';
import Select from 'react-select';
import {
  Slider, InputLabel, Button,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { CREATE_USER_SKILL } from '../../queries/SkillQueries';
import { userProfileAction } from '../useUserProfile';

function NewSkill({ skills, userId, dispatch }) {
  const [newUserSkill, setNewUserSkill] = useState(null);
  const [createUserSkillCall] = useMutation(CREATE_USER_SKILL);

  const onClickAdd = async () => {
    try {
      const { data } = await createUserSkillCall({
        variables: {
          userId, skillId: newUserSkill.skill.id, rating: newUserSkill.rating,
        },
      });
      dispatch({ type: userProfileAction.ADD_SKILL, payload: data.createUserSkill });
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <form>
      <InputLabel id="skill">
        Add a new skill
        <Select
          name="skill"
          aria-labelledby="skill"
          data-testid="skill"
          options={skills}
          onChange={(e) => setNewUserSkill((prev) => ({ ...prev, skill: e.value }))}
        />
      </InputLabel>
      <Slider
        data-testid="newskill-rating"
        defaultValue={1}
        valueLabelDisplay="auto"
        marks
        min={1}
        max={5}
        onChange={(e, value) => setNewUserSkill((prev) => ({ ...prev, rating: value }))}
      />
      <Button onClick={onClickAdd}>
        add skill
      </Button>
    </form>
  );
}

export default NewSkill;
