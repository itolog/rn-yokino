import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const UserState = (state: AppState) => state.user;

export const getUser = createSelector(UserState, state => state.user);

export const isUserLogged = createSelector(UserState, state => state.isLogged);
