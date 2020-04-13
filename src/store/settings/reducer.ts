import { ActionTypes, ActionTypeUnion } from './actions';
import { SettingsState } from './types';
import { THEMES } from '../../shared/constants/themes';

const initialState: SettingsState = {
  imgPath: THEMES.DEFAULT_BG,
  themeColor: '',
  error: null,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): SettingsState {
  switch (action.type) {
    case ActionTypes.SET_IMG_PATH_SUCCESS: {
      return {
        ...state,
        imgPath: action.payload,
      };
    }
    case ActionTypes.SET_IMG_PATH_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.GET_IMG_PATH_SUCCESS: {
      return {
        ...state,
        imgPath: action.payload,
      };
    }
    case ActionTypes.GET_IMG_PATH_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.RESET_IMG_PATH_SUCCESS: {
      return {
        ...state,
        imgPath: THEMES.DEFAULT_BG,
      };
    }
    case ActionTypes.RESET_IMG_PATH_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
