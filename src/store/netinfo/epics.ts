import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap, take } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';

const getInfoEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_NET_INFO),
    switchMap(({ payload }) => of(Actions.getNetInfo(payload))),
    catchError(() => of(Actions.getInfoFailure('error in getNetInfo'))),
    take(2),
  );

export const epics = [getInfoEpic];
