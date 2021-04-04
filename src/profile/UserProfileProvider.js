import React, { createContext } from 'react';
import useUserProfile from './useUserProfile';

export const UserProfileContext = createContext();

function UserProfileProvider({ initialValue, children }) {
  const value = useUserProfile(initialValue);

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}
export default UserProfileProvider;
