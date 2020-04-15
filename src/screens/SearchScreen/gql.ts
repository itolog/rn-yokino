import { gql } from 'apollo-boost';

export const SEARCH = gql`
  query Search($title: String!) {
    search(title: $title) {
      results {
        id
        name
        quality
        poster
        kinopoisk
        imdb
        year
      }
    }
  }
`;
