// src/graphql/queries/emailQueries.js
import { gql } from '@apollo/client';

export const CHECK_EMAIL_EXISTS = gql`
  query EmailExists($email: String!) {
    emailExists(email: $email)
  }
`;
