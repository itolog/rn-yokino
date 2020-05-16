import { ActionTypes, ActionTypeUnion } from './actions';
import { HeaderState } from './types';

const initialState: HeaderState = {
  isSearchBarVisible: false,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): HeaderState {
  switch (action.type) {
    case ActionTypes.SEARCH_BAR_SHOW: {
      return {
        ...state,
        isSearchBarVisible: true,
      };
    }
    case ActionTypes.SEARCH_BAR_HIDE: {
      return {
        ...state,
        isSearchBarVisible: false,
      };
    }
    case ActionTypes.SEARCH_BAR_TOGGLE: {
      return {
        ...state,
        isSearchBarVisible: !state.isSearchBarVisible,
      };
    }
    default: {
      return state;
    }
  }
}
