import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, map, switchMap, take } from 'rxjs/operators';

import { dbFavoritesService } from './db-favorites.service';

import { Actions, ActionTypes } from './actions';

const saveFavoriteMovieEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SAVE_FAVORITE_MOVIE),
    switchMap(({ payload }) => {
      return dbFavoritesService.saveFavorites(payload).pipe(
        map(() => {
          return Actions.saveFavoriteMovieSuccess(payload);
        }),
        catchError(() => {
          console.log('Ошибка сохранения в базу Favorites');
          return of(
            Actions.saveFavoriteMovieFailure('Ошибка сохранеения в избранное'),
          );
        }),
        take(1),
      );
    }),
  );

const removeFavoriteMovieEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_FAVORITE_MOVIE),
    switchMap(({ payload }) => {
      return dbFavoritesService.removeFavorites(payload).pipe(
        map(id => {
          return Actions.removeFavoriteSuccess(Number(id));
        }),
        catchError(() => {
          console.log('Ошибка удаления из базы Favorites');
          return of(
            Actions.removeFavoriteFailure('Ошибка удаления из Избранного'),
          );
        }),
        take(1),
      );
    }),
  );

const loadFavoriteMovieEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.LOAD_FAVORITE_MOVIE),
    switchMap(() => {
      return dbFavoritesService.getFavorites().pipe(
        map(res => {
          return Actions.loadFavoriteSuccess(res);
        }),
        catchError(() => {
          console.log('Ошибка загрузки из базы Favorites');
          return of(
            Actions.loadFavoriteFailure('Ошибка загрузки из Избранного'),
          );
        }),
      );
    }),
    take(1),
  );

export const epics = [
  saveFavoriteMovieEpic,
  removeFavoriteMovieEpic,
  loadFavoriteMovieEpic,
];
