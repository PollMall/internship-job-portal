import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/UserQueries';
import { UserContext } from '../UserProvider';
import Info from '../Info';
import UserProfile from './UserProfile';
import UserProfileProvider from './UserProfileProvider';

function ProfilePage() {
  const { state } = useContext(UserContext);
  const {
    data, loading, error,
  } = useQuery(GET_USER, { variables: { id: state.user?.id } });

  return (
    <>
      <Info loading={loading} error={!!error} />
      {data
      && (
      <UserProfileProvider initialValue={{ user: data?.user }}>
        <UserProfile />
      </UserProfileProvider>
      )}
    </>
  );
}

export default ProfilePage;
