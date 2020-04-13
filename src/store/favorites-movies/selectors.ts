import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const favoriteMoviesState = (state: AppState) => state.favoritesMovie;

export const getFavoriteMoviesIds = createSelector(
  favoriteMoviesState,
  state => state.ids,
);

export const getFavoritesMovies = createSelector(
  favoriteMoviesState,
  state => state.movies,
);

export const getErrorFavorites = createSelector(
  favoriteMoviesState,
  state => state.error,
);
