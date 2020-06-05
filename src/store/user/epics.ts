import { Epic, ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';

import { catchError, map, switchMap } from 'rxjs/operators';
import { asyncStorageService } from './asyncStorage.service';

import { Actions, ActionTypes } from './actions';
import { UserLoginDto } from '../../shared/generated/graphql';

interface IPayload {
  payload: UserLoginDto;
}

const setUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_USER),
    switchMap(({ payload }: IPayload) => {
      delete payload.__typename;
      return asyncStorageService.setUser(payload).pipe(map(() => payload));
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
    switchMap(() => asyncStorageService.deleteUser()),
    switchMap(() => of(Actions.removeUserSuccess())),
    catchError(e =>
      of(Actions.removeUserFailure(`remove user error: ${e.message}`)),
    ),
  );

const loadUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.LOAD_USER),
    switchMap(() => {
      return asyncStorageService.getUser();
    }),
    switchMap(user => {
      if (user) {
        return of(Actions.setUserSuccess(user));
      }
      return EMPTY;
    }),
    catchError(e =>
      of(Actions.setUserFailure(`error load user: ${e.message}`)),
    ),
  );

export const epics = [setUserEpic, loadUserEpic, removeUserEpic];
