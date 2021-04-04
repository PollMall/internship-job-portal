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

export const CREATE_JOB_APPLICATION = gql`
mutation($userId: Int!, $jobId: Int!) {
  createUserJobApplication(userId: $userId, jobId: $jobId) {
    id,
    job{
      id
      name
      description
    }
    user {
      id
      username
      firstName
      lastName
    }
    isAccepted
    updatedAt
  }
}
`;

export const GET_JOB_APPLICATIONS = gql`
query{
  userJobApplications{
    id,
    job{
      id
      name
      description
    }
    user {
      id
      username
      firstName
      lastName
    }
    isAccepted
    updatedAt
  }
}
`;
