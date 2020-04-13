import { gql } from 'apollo-boost';

export const MOVIES = gql`
  query Movies($page: Float!, $year: Float!, $genre_id: Float!) {
    movies(page: $page, year: $year, genre_id: $genre_id) {
      total
      prev_page
      next_page
      results {
        id
        name
        imdb_id
        kinopoisk_id
        iframe_url
        year
        quality
        imdb
        kinopoisk
        poster
      }
    }
  }
`;
