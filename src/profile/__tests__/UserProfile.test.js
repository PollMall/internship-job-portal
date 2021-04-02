import React from 'react';
import UserProfile from '../UserProfile';
import UserProfileProvider from '../UserProfileProvider';
import { render } from '../../setupTests';
import { user } from '../../res/mockData';

describe('UserProfile tests', () => {
  it('should match snapshot in edit mode', () => {
    const initialValue = {
      user,
      basicInfoEdit: true,
      contactInfoEdit: true,
      skillsEdit: true,
      educationsEdit: true,
      workExperiencesEdit: true,
    };
    const { container } = render(
      <UserProfileProvider initialValue={initialValue}>
        <UserProfile />
      </UserProfileProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
