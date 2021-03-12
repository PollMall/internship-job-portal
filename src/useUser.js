import { useReducer } from 'react';

export const userAction = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

function reducer(state, action) {
  switch (action.type) {
    case userAction.LOGIN:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case userAction.LOGOUT:
      localStorage.removeItem('user');
      return { ...state, user: undefined };
    default:
      return new Error('Reducer action not supported');
  }
}

export function useUser(initialValue) {
  const [state, dispatch] = useReducer(reducer,
    initialValue || { user: JSON.parse(localStorage.getItem('user')) || undefined });
  return {
    state,
    dispatch,
  };
}
