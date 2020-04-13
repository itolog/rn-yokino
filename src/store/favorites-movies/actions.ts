import { action, ActionType } from 'typesafe-actions';
import { Favorites } from '../../shared/interface/favorites';

export enum ActionTypes {
  SAVE_FAVORITE_MOVIE = 'SAVE_FAVORITE_MOVIE',
  SAVE_FAVORITE_MOVIE_SUCCESS = 'SAVE_FAVORITE_MOVIE_SUCCESS',
  SAVE_FAVORITE_MOVIE_FAILURE = 'SAVE_FAVORITE_MOVIE_FAILURE',

  REMOVE_FAVORITE_MOVIE = 'REMOVE_FAVORITE_MOVIE',
  REMOVE_FAVORITE_MOVIE_SUCCESS = 'REMOVE_FAVORITE_MOVIE_SUCCESS',
  REMOVE_FAVORITE_MOVIE_FAILURE = 'REMOVE_FAVORITE_MOVIE_FAILURE',

  LOAD_FAVORITE_MOVIE = 'LOAD_FAVORITE_MOVIE',
  LOAD_FAVORITE_MOVIE_SUCCESS = 'LOAD_MOVIE_SUCCESS',
  LOAD_FAVORITE_MOVIE_FAILURE = 'LOAD_FAVORITE_MOVIE_FAILURE',

  CLEAR_ERROR_STATE = 'CLEAR_ERROR_STATE',
}

export const Actions = {
  saveFavoriteMovie: (payload: Favorites) =>
    action(ActionTypes.SAVE_FAVORITE_MOVIE, payload),
  saveFavoriteMovieSuccess: (payload: Favorites) =>
    action(ActionTypes.SAVE_FAVORITE_MOVIE_SUCCESS, payload),
  saveFavoriteMovieFailure: (payload: any) =>
    action(ActionTypes.SAVE_FAVORITE_MOVIE_FAILURE, payload),

  removeFavoriteMovie: (payload: number) =>
    action(ActionTypes.REMOVE_FAVORITE_MOVIE, payload),
  removeFavoriteSuccess: (payload: number) =>
    action(ActionTypes.REMOVE_FAVORITE_MOVIE_SUCCESS, payload),
  removeFavoriteFailure: (payload: any) =>
    action(ActionTypes.REMOVE_FAVORITE_MOVIE_FAILURE, payload),

  loadFavorite: () => action(ActionTypes.LOAD_FAVORITE_MOVIE),
  loadFavoriteSuccess: (payload: Favorites[]) =>
    action(ActionTypes.LOAD_FAVORITE_MOVIE_SUCCESS, payload),
  loadFavoriteFailure: (payload: any) =>
    action(ActionTypes.LOAD_FAVORITE_MOVIE_FAILURE, payload),

  clearErrorState: () => action(ActionTypes.CLEAR_ERROR_STATE),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
