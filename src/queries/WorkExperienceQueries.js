import { gql } from '@apollo/client';

export const CREATE_USER_WORK_EXPERIENCE = gql`
mutation(
  $institution: String
  $description: String
  $userId: Int!
  $startDate: String
  $endDate: String
) {
  createUserWorkExperience(
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

export const DELETE_USER_WORK_EXPERIENCE = gql`
mutation($id: [Int!]!) {
  deleteUserWorkExperience(id: $id)
}
`;

export const UPDATE_USER_WORK_EXPERIENCE = gql`
mutation(
  $id: Int!
  $institution: String
  $description: String
  $userId: Int!
  $startDate: String
  $endDate: String
) {
  updateUserWorkExperience(
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
