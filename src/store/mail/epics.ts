import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';

const sendMailEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SEND_MAIL),
    switchMap(() => {
      return of(Actions.sendMailSuccess('mail success send!'));
    }),
    catchError(error => of(Actions.sendMailFailure(error.message))),
  );

export const epics = [sendMailEpic];
