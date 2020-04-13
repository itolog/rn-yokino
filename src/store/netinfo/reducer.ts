import { ActionTypes, ActionTypeUnion } from './actions';
import { NetState } from './types';

const initialState: NetState = {
  netInfo: {},
  error: '',
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): NetState {
  switch (action.type) {
    case ActionTypes.GET_NET_INFO: {
      return {
        ...state,
        netInfo: action.payload,
      };
    }

    case ActionTypes.GET_NET_INFO_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
