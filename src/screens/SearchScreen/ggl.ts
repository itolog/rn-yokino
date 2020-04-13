import { gql } from 'apollo-boost';

export const SEARCH_MOVIES = gql`
  query SearchMovies($title: String!) {
    searchMedia(title: $title) {
      movies {
        id
        ru_title
        orig_title
        kinopoisk_id
        year
        poster
      }
      serials {
        id
        ru_title
        start_date
        season_count
        kinopoisk_id
        episode_count
        poster
      }
    }
  }
`;
