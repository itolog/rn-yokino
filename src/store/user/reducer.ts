import { ActionTypes, ActionTypeUnion } from './actions';
import { UserState } from './types';

const initialState: UserState = {
  user: {},
  isLogged: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): UserState {
  switch (action.type) {
    case ActionTypes.SET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLogged: true,
      };
    }
    case ActionTypes.SET_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.REMOVE_USER_SUCCESS: {
      return {
        error: null,
        user: {},
        isLogged: false,
      };
    }
    case ActionTypes.REMOVE_USER_FAILURE: {
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
