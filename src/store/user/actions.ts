import { action, ActionType } from 'typesafe-actions';

import { UserLoginDto } from '../../shared/generated/graphql';

export enum ActionTypes {
  SET_USER = 'SET_USER',
  SET_USER_SUCCESS = 'SET_USER_SUCCESS',
  SET_USER_FAILURE = 'SET_USER_FAILURE',

  REMOVE_USER = 'REMOVE_USER',
  REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS',
  REMOVE_USER_FAILURE = 'REMOVE_USER_FAILURE',

  LOAD_USER = 'LOAD_USER',
}

export const Actions = {
  setUser: (payload: UserLoginDto) => action(ActionTypes.SET_USER, payload),
  setUserSuccess: (payload: UserLoginDto) =>
    action(ActionTypes.SET_USER_SUCCESS, payload),
  setUserFailure: (error: any) => action(ActionTypes.SET_USER_FAILURE, error),

  removeUser: () => action(ActionTypes.REMOVE_USER),
  removeUserSuccess: () => action(ActionTypes.REMOVE_USER_SUCCESS),
  removeUserFailure: (error: any) =>
    action(ActionTypes.REMOVE_USER_FAILURE, error),

  loadUser: () => action(ActionTypes.LOAD_USER),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
