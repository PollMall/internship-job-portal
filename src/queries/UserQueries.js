import { gql } from '@apollo/client';

export const GET_USERS = gql`
query {
  users {
    id
    username
    password
    firstName
    lastName
    userRole {
      id
      name
    }
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $firstName: String!, $lastName: String!, $password: String!, $userRoleId: Int!){
  createUser(username:$username, firstName:$firstName, lastName:$lastName, password:$password,userRoleId:$userRoleId){
    id
    username,
    firstName,
    lastName,
    password,
    userRole {
      id
      name
    }
  }
}
`;

export const DELETE_USER = gql`
mutation($id: [Int!]!){
  deleteUser(id:$id)
}
`;

export const UPDATE_USER = gql`
mutation(
  $id: Int!
  $username: String
  $firstName: String
  $lastName: String
  $password: String
  $userRoleId: Int
  $contactInfoId: Int
) {
  updateUser(
    id: $id
    username: $username
    firstName: $firstName
    lastName: $lastName
    password: $password
    userRoleId: $userRoleId
    contactInfoId: $contactInfoId
  ) {
    id
    username
    firstName
    lastName
    password
    contactInfo {
      id
      email
      phone
      city
      country {
        id
        name
      }
      website
      avatarUrl
      about
    }
    userEducations {
      id
      institution
      description
      startDate
      endDate
    }
    userWorkExperiences {
      id
      institution
      description
      startDate
      endDate
    }
    userSkills {
      id
      skill {
        id
        name
      }
      rating
    }
    updatedAt
  }
}
`;

export const GET_USER_ROLES = gql`
query{
  userRoles{
    id,
    name
  }
}
`;

export const GET_USER = gql`
query($id: Int!) {
  user(id: $id) {
    id
    username
    firstName
    lastName
    password
    contactInfo {
      id
      email
      phone
      city
      country {
        id
        name
      }
      website
      avatarUrl
      about
    }
    userEducations {
      id
      institution
      description
      startDate
      endDate
    }
    userWorkExperiences {
      id
      institution
      description
      startDate
      endDate
    }
    userSkills {
      id
      skill {
        id
        name
      }
      rating
    }
    updatedAt
  }
}
`;
