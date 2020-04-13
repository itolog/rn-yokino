import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getNetInfoState = (state: AppState) => state.netInfo;

export const getNetState = createSelector(
  getNetInfoState,
  state => state.netInfo,
);
