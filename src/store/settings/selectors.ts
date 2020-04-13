import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getSettingsState = (state: AppState) => state.settings;

export const getImagePath = createSelector(
  getSettingsState,
  state => state.imgPath,
);

export const getImagePathError = createSelector(
  getSettingsState,
  state => state.error,
);
