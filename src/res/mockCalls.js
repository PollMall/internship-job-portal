import {
  users, userRoles, user, contactInfo,
} from './mockData';
import {
  GET_USERS, DELETE_USER, GET_USER_ROLES, GET_USER, UPDATE_USER,
} from '../queries/UserQueries';
import { UPDATE_CONTACT_INFO } from '../queries/ContactInfoQueries';

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

export const updateUser = (variables) => ({
  query: UPDATE_USER,
  variables,
  response: {
    updateUser: user,
  },
});

export const updateContactInfo = (variables) => ({
  query: UPDATE_CONTACT_INFO,
  variables,
  response: {
    updateContactInfo: contactInfo,
  },
});
