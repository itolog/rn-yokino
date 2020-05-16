import { gql } from 'apollo-boost';

export const GET_MOVIE = gql`
  query GetMovie($id: Float!) {
    movieInfo(id: $id) {
      id
      name
      name_eng
      kinopoisk
      kinopoisk_id
      imdb
      imdb_id
      year
      iframe_url
      poster
      premier
      description
      country
      genre
      director
      actors
      quality
      time
      backdrop_path
      parts
      trailers {
        number
        name
        iframe_url
      }
    }
  }
`;
