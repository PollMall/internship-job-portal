import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query{
    users{
      id,
      username,
      password
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $firstName: String!, $lastName: String!, $password: String!, $userRoleId: Int!){
  createUser(username:$username, firstName:$firstName, lastName:$lastName, password:$password,userRoleId:$userRoleId){
    username,
    firstName,
    lastName,
    password,
  }
}
`;
