import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  HEADER_SHOW = 'HEADER_SHOW',
  HEADER_HIDE = 'HEADER_HIDE',
}

export const Actions = {
  headerShow: () => action(ActionTypes.HEADER_SHOW),
  headerHide: () => action(ActionTypes.HEADER_HIDE),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
