import { ActionTypes, ActionTypeUnion } from './actions';
import { FavoriteState } from './types';

const initialState: FavoriteState = {
  movies: [],
  error: null,
  ids: [],
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): FavoriteState {
  switch (action.type) {
    case ActionTypes.SAVE_FAVORITE_MOVIE_SUCCESS: {
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        movies: [...state.movies, action.payload],
      };
    }
    case ActionTypes.SAVE_FAVORITE_MOVIE_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.REMOVE_FAVORITE_MOVIE_SUCCESS: {
      const movies = state.movies.filter(item => item.id !== action.payload);
      const ids = movies.map(i => i.id);
      return {
        ...state,
        ids,
        movies,
      };
    }
    case ActionTypes.REMOVE_FAVORITE_MOVIE_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.LOAD_FAVORITE_MOVIE_SUCCESS: {
      const ids = action.payload.map(item => item.id);
      return {
        ...state,
        ids,
        movies: action.payload,
      };
    }
    case ActionTypes.LOAD_FAVORITE_MOVIE_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.CLEAR_ERROR_STATE: {
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
