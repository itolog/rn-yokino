import { gql } from 'apollo-boost';

export const ANIME_SERIALS = gql`
  query AnimeSerials($page: Float!, $year: Float!, $genre_id: Float!) {
    animeSerials(page: $page, year: $year, genre_id: $genre_id) {
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
