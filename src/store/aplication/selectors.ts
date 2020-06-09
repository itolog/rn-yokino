import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const AplicationState = (state: AppState) => state.application;

export const isAplicationInit = createSelector(
  AplicationState,
  state => state.isInit,
);
