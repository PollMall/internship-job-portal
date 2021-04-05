import { gql } from '@apollo/client';

export const UPDATE_CONTACT_INFO = gql`
mutation(
  $id: Int!
  $email: String
  $phone: String
  $city: String
  $countryId: Int
  $website: String
  $avatarUrl: String
  $about: String
) {
  updateContactInfo(
    id: $id
    email: $email
    phone: $phone
    city: $city
    countryId: $countryId
    website: $website
    avatarUrl: $avatarUrl
    about: $about
  ) {
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
}
`;

export const CREATE_CONTACT_INFO = gql`
mutation(
  $email: String!
  $phone: String!
  $city: String!
  $countryId: Int!
  $website: String
  $avatarUrl: String
  $about: String
) {
  createContactInfo(
    email: $email
    phone: $phone
    city: $city
    countryId: $countryId
    website: $website
    avatarUrl: $avatarUrl
    about: $about
  ) {
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
}
`;
