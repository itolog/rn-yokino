import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, map, switchMap } from 'rxjs/operators';
import AsyncStorageService from './asyncStorage.service';

import { Actions, ActionTypes } from './actions';
import { UserLoginDto } from '../../shared/generated/graphql';

const asyncStorage = new AsyncStorageService();

interface IPayload {
  payload: UserLoginDto;
}

const setUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_USER),
    switchMap(({ payload }: IPayload) => {
      delete payload.__typename;
      return asyncStorage.setUser(payload).pipe(map(() => payload));
    }),
    switchMap(res => {
      return of(Actions.setUserSuccess(res));
    }),
    catchError(e => {
      return of(
        Actions.setUserFailure(`error set user to storage: ${e.message}`),
      );
    }),
  );

const removeUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_USER),
    switchMap(() => asyncStorage.deleteUser()),
    switchMap(() => of(Actions.removeUserSuccess())),
    catchError(e =>
      of(Actions.removeUserFailure(`remove user error: ${e.message}`)),
    ),
  );

const loadUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.LOAD_USER),
    switchMap(() => {
      return asyncStorage.getUser();
    }),
    switchMap(res => {
      return of(Actions.setUserSuccess(res));
    }),
    catchError(e =>
      of(Actions.setUserFailure(`error load user: ${e.message}`)),
    ),
  );

export const epics = [setUserEpic, loadUserEpic, removeUserEpic];
