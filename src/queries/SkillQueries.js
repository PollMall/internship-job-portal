import { gql } from '@apollo/client';

export const GET_SKILLS = gql`
query{
  skills{
    id
    name
  }
}
`;

export const CREATE_USER_SKILL = gql`
mutation($userId: Int!, $skillId: Int!, $rating: Int!){
  createUserSkill(userId: $userId, skillId: $skillId, rating: $rating){
    id
    skill{
      id
      name
    }
    rating
  }
}
`;

export const DELETE_USER_SKILL = gql`
mutation($id: [Int!]!){
  deleteUserSkill(id: $id)
}
`;

export const UPDATE_USER_SKILL = gql`
mutation($id: Int!, $userId: Int, $skillId: Int, $rating: Int) {
  updateUserSkill(
    id: $id
    userId: $userId
    skillId: $skillId
    rating: $rating
  ) {
    id
    user {
      id
    }
    skill {
      id
    }
    rating
  }
}
`;
