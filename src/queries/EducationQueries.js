import { gql } from '@apollo/client';

export const CREATE_USER_EDUCATION = gql`
mutation(
  $institution: String
  $description: String
  $userId: Int!
  $startDate: String
  $endDate: String
) {
  createUserEducation(
    institution: $institution
    description: $description
    userId: $userId
    startDate: $startDate
    endDate: $endDate
  ) {
    id
    institution
    description
    startDate
    endDate
  }
}
`;

export const DELETE_USER_EDUCATION = gql`
mutation($id: [Int!]!) {
  deleteUserEducation(id: $id)
}
`;

export const UPDATE_USER_EDUCATION = gql`
mutation(
  $id: Int!
  $institution: String
  $description: String
  $userId: Int!
  $startDate: String
  $endDate: String
) {
  updateUserEducation(
    id: $id
    institution: $institution
    description: $description
    userId: $userId
    startDate: $startDate
    endDate: $endDate
  ) {
    id
    institution
    description
    startDate
    endDate
  }
}
`;
