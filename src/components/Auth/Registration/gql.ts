import { gql } from 'apollo-boost';

export const REEGISTRATION = gql`
  mutation REEGISTRATION($input: UserInput!) {
    registration(data: $input) {
      id
      name
      role
      banned
      email
    }
  }
`;
