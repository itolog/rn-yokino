import { ActionTypes, ActionTypeUnion } from './actions';
import { MailState } from './types';

const initialState: MailState = {
  isSend: false,
  error: null,
  message: null,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): MailState {
  switch (action.type) {
    case ActionTypes.SEND_MAIL_SUCCESS: {
      return {
        ...state,
        isSend: true,
        message: action.payload,
      };
    }
    case ActionTypes.SEND_MAIL_FAILURE: {
      return {
        ...state,
        isSend: true,
        error: action.payload,
      };
    }
    case ActionTypes.SEND_MAIL_RESET: {
      return {
        isSend: false,
        error: null,
        message: null,
      };
    }
    default: {
      return state;
    }
  }
}
