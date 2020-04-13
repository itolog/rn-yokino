import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SET_IMG_PATH = 'SET_IMG_PATH',
  SET_IMG_PATH_SUCCESS = 'SET_IMG_PATH_SUCCESS',
  SET_IMG_PATH_FAILURE = 'SET_IMG_PATH_FAILURE',

  GET_IMG_PATH = 'GET_IMG_PATH',
  GET_IMG_PATH_SUCCESS = 'GET_IMG_PATH_SUCCESS',
  GET_IMG_PATH_FAILURE = 'GET_IMG_PATH_FAILURE',

  RESET_IMG_PATH = 'RESET_IMG_PATH',
  RESET_IMG_PATH_SUCCESS = 'RESET_IMG_PATH_SUCCESS',
  RESET_IMG_PATH_FAILURE = 'RESET_IMG_PATH_FAILURE',

  CLEAR_ERROR = 'CLEAR_ERROR',
}

export const Actions = {
  setImgPath: (payload: string) => action(ActionTypes.SET_IMG_PATH, payload),
  setImgPathSuccess: (payload: string) =>
    action(ActionTypes.SET_IMG_PATH_SUCCESS, payload),
  setImgPathFailure: (error: string) =>
    action(ActionTypes.SET_IMG_PATH_FAILURE, error),

  getImgPath: () => action(ActionTypes.GET_IMG_PATH),
  getImgPathSuccess: (payload: string) =>
    action(ActionTypes.GET_IMG_PATH_SUCCESS, payload),
  getImgPathFailure: (error: string) =>
    action(ActionTypes.GET_IMG_PATH_FAILURE, error),

  resetImagePath: () => action(ActionTypes.RESET_IMG_PATH),
  resetImageSuccess: () => action(ActionTypes.RESET_IMG_PATH_SUCCESS),
  resetImageFailure: (error: string) => action(ActionTypes.RESET_IMG_PATH_FAILURE, error),

  clearSettingsError: () => action(ActionTypes.CLEAR_ERROR),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
