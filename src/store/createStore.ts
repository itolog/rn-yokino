import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';

// import NetInfo
import { ActionTypeUnion as NetInfoActionType } from './netinfo/actions';
import { reducer as netInfoReducer } from './netinfo/reducer';
import { epics as netInfoEpics } from './netinfo/epics';

// import FAVORITES
import { ActionTypeUnion as FavoritesActionType } from './favorites-movies/actions';
import { reducer as favoritesReducer } from './favorites-movies/reducer';
import { epics as favoritesEpics } from './favorites-movies/epics';

// import Settings
import { ActionTypeUnion as SettingsActionType } from './settings/actions';
import { reducer as settingsReducer } from './settings/reducer';
import { epics as settingsEpic } from './settings/epics';

// import Animation state
import { ActionTypeUnion as AnimationActionType } from './animation/actions';
import { reducer as animationReducer } from './animation/reducer';

// import Header
import { ActionTypeUnion as HeaderActionsType } from './header/actions';
import { reducer as headerReducer } from './header/reducer';

// import User
import { ActionTypeUnion as UserActionType } from './user/actions';
import { reducer as userReducer } from './user/reducer';
import { epics as userEpic } from './user/epics';

const rootEpic = combineEpics(
  ...netInfoEpics,
  ...favoritesEpics,
  ...settingsEpic,
  ...userEpic,
);
const epicMiddleware = createEpicMiddleware();

// Reducers
const reducer = combineReducers({
  netInfo: netInfoReducer,
  favoritesMovie: favoritesReducer,
  settings: settingsReducer,
  animState: animationReducer,
  header: headerReducer,
  user: userReducer,
});

export type RootActions = ActionType<
  | NetInfoActionType
  | FavoritesActionType
  | SettingsActionType
  | AnimationActionType
  | HeaderActionsType
  | UserActionType
>;

export type AppState = StateType<typeof reducer>;

const middlewares = [epicMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const store = createStore(reducer, undefined, middlewareEnhancer);

epicMiddleware.run(rootEpic);

export default store;
