import { ActionTypes, ActionTypeUnion } from './actions';
import { AplicationState } from './types';

const initialState: AplicationState = {
  isInit: false,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): AplicationState {
  switch (action.type) {
    case ActionTypes.APP_INIT: {
      return {
        ...state,
        isInit: true,
      };
    }
    default: {
      return state;
    }
  }
}
