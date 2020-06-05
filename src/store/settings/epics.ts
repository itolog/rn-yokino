import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, map, pluck, switchMap } from 'rxjs/operators';

import { dbSettingsService } from './db-settings.service';
import { THEMES } from '../../shared/constants/themes';

import { Actions, ActionTypes } from './actions';

const setImagePathEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_IMG_PATH),
    switchMap(({ payload }) => {
      return dbSettingsService.updateImage(payload).pipe(
        map(() => {
          return Actions.setImgPathSuccess(payload);
        }),
        catchError(() => {
          console.log('Ошибка обновления картинки фона');
          return of(
            Actions.setImgPathFailure('Ошибка обновления картинки фона'),
          );
        }),
      );
    }),
  );

const resetImagePathEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.RESET_IMG_PATH),
    switchMap(() => {
      return dbSettingsService.updateImage(THEMES.DEFAULT_BG).pipe(
        map(() => {
          return Actions.resetImageSuccess();
        }),
        catchError(() => {
          console.log('Ошибка сброса картинки фона');
          return of(Actions.resetImageFailure('Ошибка сброса картинки фона'));
        }),
      );
    }),
  );

const getImagePathEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_IMG_PATH),
    switchMap(() => {
      return dbSettingsService.getSettings().pipe(
        pluck('0', 'imagePath'),
        map(res => {
          const path = res as string;
          return Actions.getImgPathSuccess(path);
        }),
        catchError(() => {
          console.log('Ошибка загрузки картинки');
          return of(Actions.setImgPathFailure('Ошибка загрузки картинки'));
        }),
      );
    }),
    catchError(error => of(Actions.getImgPathFailure(error.message))),
  );

export const epics = [setImagePathEpic, getImagePathEpic, resetImagePathEpic];
