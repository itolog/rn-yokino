import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SEARCH_BAR_SHOW = 'HEADER_SHOW',
  SEARCH_BAR_HIDE = 'HEADER_HIDE',
  SEARCH_BAR_TOGGLE = 'HEADER_TOGGLE',
}

export const Actions = {
  searchBarShow: () => action(ActionTypes.SEARCH_BAR_SHOW),
  searchBarHide: () => action(ActionTypes.SEARCH_BAR_HIDE),
  searchBarToggle: () => action(ActionTypes.SEARCH_BAR_TOGGLE),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
