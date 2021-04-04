import { useReducer } from 'react';

export const userProfileAction = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_CONTACT_INFO: 'UPDATE_CONTACT_INFO',
  UPDATE_SKILLS: 'UPDATE_SKILLS',
  ADD_SKILL: 'ADD_SKILL',
  UPDATE_EDUCATIONS: 'UPDATE_EDUCATIONS',
  ADD_EDUCATION: 'ADD_EDUCATION',
  UPDATE_WORK_EXPERIENCES: 'UPDATE_WORK_EXPERIENCES',
  ADD_WORK_EXPERIENCE: 'ADD_WORK_EXPERIENCE',
  EDIT: 'EDIT',
  CANCEL: 'CANCEL',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case userProfileAction.UPDATE_USER:
      return { ...state, user: action.payload };
    case userProfileAction.UPDATE_CONTACT_INFO:
      return { ...state, user: { ...state.user, contactInfo: action.payload } };
    case userProfileAction.UPDATE_SKILLS:
      return { ...state, user: { ...state.user, userSkills: action.payload } };
    case userProfileAction.ADD_SKILL:
      return {
        ...state,
        user: { ...state.user, userSkills: (state.user?.userSkills || []).concat(action.payload) },
      };
    case userProfileAction.UPDATE_EDUCATIONS:
      return { ...state, user: { ...state.user, userEducations: action.payload } };
    case userProfileAction.ADD_EDUCATION:
      return {
        ...state,
        user: { ...state.user, userEducations: (state.user?.userEducations || []).concat(action.payload) },
      };
    case userProfileAction.UPDATE_WORK_EXPERIENCES:
      return { ...state, user: { ...state.user, userWorkExperiences: action.payload } };
    case userProfileAction.ADD_WORK_EXPERIENCE:
      return {
        ...state,
        user: { ...state.user, userWorkExperiences: (state.user?.userWorkExperiences || []).concat(action.payload) },
      };
    case userProfileAction.EDIT:
      return { ...state, [action.payload]: true };
    case userProfileAction.CANCEL:
      return { ...state, [action.payload]: false };
    default:
      return new Error('reducer action not supported');
  }
};

function useUserProfile(initialValue) {
  const defaultValue = {
    user: null,
    basicInfoEdit: false,
    contactInfoEdit: false,
    skillsEdit: false,
    educationsEdit: false,
    workExperiencesEdit: false,
  };
  const [state, dispatch] = useReducer(reducer, { ...defaultValue, ...initialValue });
  return { state, dispatch };
}

export default useUserProfile;
