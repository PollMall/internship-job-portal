/* eslint-disable import/prefer-default-export */
import { GET_USERS, CREATE_USER } from './UserQueries';

export const mockApolloData = [
  {
    query: GET_USERS,
    variables: {},
    data: {
      users: [
        {
          id: 1,
          username: 'Admin',
          password: 'UXdlcnR5MTIz',
        },
        {
          id: 2,
          username: 'CompanyAdmin',
          password: 'UXdlcnR5MTIz',
        },
        {
          id: 3,
          username: 'User',
          password: 'UXdlcnR5MTIz',
        },
      ],
    },
  },
  {
    query: GET_USERS,
    variables: {},
    data: {
      users: [
        {
          id: 1,
          username: 'Admin',
          password: 'UXdlcnR5MTIz',
        },
        {
          id: 2,
          username: 'CompanyAdmin',
          password: 'UXdlcnR5MTIz',
        },
        {
          id: 3,
          username: 'User',
          password: 'UXdlcnR5MTIz',
        },
      ],
    },
  },
  {
    query: CREATE_USER,
    variables: {
      username: 'test', firstName: 'test', lastName: 'test', password: 'test', userRoleId: 3,
    },
    data: {
      createUser: {
        username: 'test',
        firstName: 'test',
        lastName: 'test',
        password: 'test',
      },
    },
  },
  {
    query: CREATE_USER,
    variables: {
      username: 'test', firstName: 'test', lastName: 'test', password: 'test', userRoleId: 3,
    },
    data: {
      createUser: {
        username: 'test',
        firstName: 'test',
        lastName: 'test',
        password: 'test',
      },
    },
  },
];
