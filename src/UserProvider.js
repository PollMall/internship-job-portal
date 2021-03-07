/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { useUser } from './useUser';

export const UserContext = createContext();

function UserProvider({ initialValue, children }) {
  const value = useUser(initialValue);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
