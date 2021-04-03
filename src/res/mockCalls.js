import {
  users, userRoles, user,
} from './mockData';
import {
  GET_USERS, DELETE_USER, GET_USER_ROLES, GET_USER,
} from '../queries/UserQueries';

export const mockGetUsers = {
  query: GET_USERS,
  variables: {},
  response: {
    users,
  },
};

export const mockDeleteUser = {
  query: DELETE_USER,
  variables: { id: 1 },
  response: {
    deleteUser: true,
  },
};

export const getUserRoles = {
  query: GET_USER_ROLES,
  variables: {},
  response: {
    userRoles,
  },
};

export const getUser = {
  query: GET_USER,
  variables: { id: 1 },
  response: {
    user,
  },
};
