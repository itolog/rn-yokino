import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Collection = {
   __typename?: 'Collection';
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type Envelope = {
   __typename?: 'Envelope';
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Array<Scalars['String']>>;
};

export type Episodes = {
   __typename?: 'Episodes';
  episode?: Maybe<Scalars['Float']>;
  iframe_url?: Maybe<Scalars['String']>;
};

export type LastUpdate = {
   __typename?: 'LastUpdate';
  items?: Maybe<Array<LastUpdateItems>>;
};

export type LastUpdateItems = {
   __typename?: 'LastUpdateItems';
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  origin_name?: Maybe<Scalars['String']>;
  imdb?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  kinopoisk?: Maybe<Scalars['String']>;
  kinopoisk_id?: Maybe<Scalars['String']>;
  poster?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  release_world?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['Float']>;
  episode?: Maybe<Scalars['Float']>;
  availability?: Maybe<Scalars['String']>;
  iframe_url?: Maybe<Scalars['String']>;
};

export type MailInput = {
  from: Scalars['String'];
  text: Scalars['String'];
  name: Scalars['String'];
};

export type MailModel = {
   __typename?: 'MailModel';
  accepted?: Maybe<Array<Scalars['String']>>;
  envelopeTime?: Maybe<Scalars['Float']>;
  messageTime?: Maybe<Scalars['Float']>;
  messageSize?: Maybe<Scalars['Float']>;
  response?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['String']>;
  envelope?: Maybe<Envelope>;
};

export type Movie = {
   __typename?: 'Movie';
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  origin_name?: Maybe<Scalars['String']>;
  quality?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Float']>;
  imdb?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  kinopoisk?: Maybe<Scalars['String']>;
  kinopoisk_id?: Maybe<Scalars['String']>;
  iframe_url?: Maybe<Scalars['String']>;
  trailer?: Maybe<Scalars['String']>;
  poster?: Maybe<Scalars['String']>;
  activate_time?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  seasons?: Maybe<Array<Seasons>>;
};

export type MovieInfo = {
   __typename?: 'MovieInfo';
  id?: Maybe<Scalars['Float']>;
  iframe_url?: Maybe<Scalars['String']>;
  imdb?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  kinopoisk?: Maybe<Scalars['String']>;
  kinopoisk_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_eng?: Maybe<Scalars['String']>;
  activate_time?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Float']>;
  poster?: Maybe<Scalars['String']>;
  premier?: Maybe<Scalars['String']>;
  quality?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  director?: Maybe<Array<Scalars['String']>>;
  genre?: Maybe<Array<Scalars['String']>>;
  actors?: Maybe<Array<Scalars['String']>>;
  country?: Maybe<Array<Scalars['String']>>;
  parts?: Maybe<Array<Scalars['Int']>>;
  trailers?: Maybe<Array<Trailers>>;
};

export type Movies = {
   __typename?: 'Movies';
  total: Scalars['Int'];
  prev_page?: Maybe<Scalars['String']>;
  next_page?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Movie>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  sendEmail: MailModel;
};


export type MutationSendEmailArgs = {
  data: MailInput;
};

export type NowPlaying = {
   __typename?: 'NowPlaying';
  id?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  movies: Movies;
  serials: Movies;
  cartoon: Movies;
  cartoonSerials: Movies;
  anime: Movies;
  animeSerials: Movies;
  show: Movies;
  search: Movies;
  movieInfo: MovieInfo;
  listForCarousel: Movies;
  lastUpdate: LastUpdate;
  nowPlaying: Array<NowPlaying>;
  collection: Array<Collection>;
  getCollections: Movies;
};


export type QueryMoviesArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QuerySerialsArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryCartoonArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryCartoonSerialsArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryAnimeArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryAnimeSerialsArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryShowArgs = {
  genre_id: Scalars['Float'];
  year: Scalars['Float'];
  page: Scalars['Float'];
};


export type QuerySearchArgs = {
  title: Scalars['String'];
};


export type QueryMovieInfoArgs = {
  id: Scalars['Float'];
};


export type QueryGetCollectionsArgs = {
  page: Scalars['Float'];
  id: Scalars['Float'];
};

export type Seasons = {
   __typename?: 'Seasons';
  poster?: Maybe<Scalars['String']>;
  iframe_url?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['Float']>;
  episodes?: Maybe<Array<Episodes>>;
};

export type Trailers = {
   __typename?: 'Trailers';
  number?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['Float']>;
  iframe_url?: Maybe<Scalars['String']>;
};


