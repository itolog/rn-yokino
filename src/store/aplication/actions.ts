import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  APP_INIT = 'APP_INIT',
}

export const Actions = {
  aplicationInit: () => action(ActionTypes.APP_INIT),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
