/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const GET_JOBS = gql`
query {
  jobs {
    id
    name
    description
    isAvailable
    company {
      name
    }
    updatedAt
  }
}
`;
