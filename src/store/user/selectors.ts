import { createSelector } from 'reselect';
import { AppState } from '../createStore';
import { UserLoginDto } from '../../shared/generated/graphql';

export const UserState = (state: AppState) => state.user;

export const getUser = createSelector(UserState, state => state.user);

export const userToken = createSelector(
  UserState,
  state => (state.user as UserLoginDto).access_token,
);

export const isUserLogged = createSelector(UserState, state => state.isLogged);
