import { ActionTypes, ActionTypeUnion } from './actions';
import { AnimState } from './types';

const initialState: AnimState = {
  isHeaderVisible: true,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): AnimState {
  switch (action.type) {
    case ActionTypes.HEADER_SHOW: {
      return {
        ...state,
        isHeaderVisible: true,
      };
    }
    case ActionTypes.HEADER_HIDE: {
      return {
        ...state,
        isHeaderVisible: false,
      };
    }
    default: {
      return state;
    }
  }
}
