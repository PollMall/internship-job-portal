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

export const GET_JOB = gql`
query($id: Int!) {
  job(id: $id) {
    id
    name
    description
    company {
      name
      user {
        firstName
        lastName
      }
      contactInfo {
        email
        phone
        city
        country {
          name
        }
        website
        avatarUrl
        about
      }
    }
    jobSkills {
      skill {
        name
      }
      rating
    }
    jobRequirements {
      name
    }
    jobBenefits {
      name
    }
  }
}
`;
