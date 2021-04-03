import { reducer, userProfileAction } from '../useUserProfile';
import { user } from '../../res/mockData';

describe('useUserProfile tests', () => {
  const {
    contactInfo, userSkills, userEducations, userWorkExperiences,
  } = user;

  it('should return Error', () => {
    const res = reducer({}, 'ERROR');
    expect(res).toEqual(Error('reducer action not supported'));
  });

  it('should update user', () => {
    expect(reducer({}, {
      type: userProfileAction.UPDATE_USER,
      payload: user,
    })).toEqual({ user });
  });

  it('should update contact info', () => {
    expect(reducer({ user: {} }, {
      type: userProfileAction.UPDATE_CONTACT_INFO,
      payload: contactInfo,
    })).toEqual({ user: { contactInfo } });
  });

  it('should update skills', () => {
    expect(reducer({ user: {} }, {
      type: userProfileAction.UPDATE_SKILLS,
      payload: userSkills,
    })).toEqual({ user: { userSkills } });
  });

  it('should add skill', () => {
    expect(reducer({ user: { userSkills: [userSkills[0]] } }, {
      type: userProfileAction.ADD_SKILL,
      payload: userSkills[1],
    })).toEqual({ user: { userSkills } });

    expect(reducer({ user: { } }, {
      type: userProfileAction.ADD_SKILL,
      payload: userSkills[1],
    })).toEqual({ user: { userSkills: [userSkills[1]] } });
  });

  it('should update educations', () => {
    expect(reducer({ user: {} }, {
      type: userProfileAction.UPDATE_EDUCATIONS,
      payload: userEducations,
    })).toEqual({ user: { userEducations } });
  });

  it('should add education', () => {
    expect(reducer({ user: { userEducations: [userEducations[0]] } }, {
      type: userProfileAction.ADD_EDUCATION,
      payload: userEducations[1],
    })).toEqual({ user: { userEducations } });

    expect(reducer({ user: { } }, {
      type: userProfileAction.ADD_EDUCATION,
      payload: userEducations[1],
    })).toEqual({ user: { userEducations: [userEducations[1]] } });
  });

  it('should update work experiences', () => {
    expect(reducer({ user: {} }, {
      type: userProfileAction.UPDATE_WORK_EXPERIENCES,
      payload: userWorkExperiences,
    })).toEqual({ user: { userWorkExperiences } });
  });

  it('should add work experiences', () => {
    expect(reducer({ user: { userWorkExperiences: [userWorkExperiences[0]] } }, {
      type: userProfileAction.ADD_WORK_EXPERIENCE,
      payload: userWorkExperiences[1],
    })).toEqual({ user: { userWorkExperiences } });

    expect(reducer({ user: { } }, {
      type: userProfileAction.ADD_WORK_EXPERIENCE,
      payload: userWorkExperiences[1],
    })).toEqual({ user: { userWorkExperiences: [userWorkExperiences[1]] } });
  });

  it('should enter edit mode', () => {
    expect(reducer({}, {
      type: userProfileAction.EDIT,
      payload: 'section',
    })).toEqual({ section: true });
  });

  it('should cancel edit mode', () => {
    expect(reducer({}, {
      type: userProfileAction.CANCEL,
      payload: 'section',
    })).toEqual({ section: false });
  });
});
