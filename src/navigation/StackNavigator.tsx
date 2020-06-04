import React from 'react';

import FilmsScreen from '../screens/FilmsScreen/FilmsScreen';
import SerialsScreen from '../screens/SerialsScreen/SerialsScreen';
import ShowScreen from '../screens/ShowScreen/ShowScreen';
import AnimeScreen from '../screens/AnimeScreen/AnimeScreen';
import AnimeSerialsScreen from '../screens/AnimeSerialsScreen/AnimeSerialsScreen';
import CartoonScreen from '../screens/CartoonScreen/CartoonScreen';
import CartoonSerialsScreen from '../screens/CartoonSerialsScreen/CartoonSerialsScreen';

import StackScreenBuilder from './builders/StackScreenBuilder';

export const FilmsNavigator = () => (
  <StackScreenBuilder
    screenName='Films'
    screenTitle='Фильмы'
    component={FilmsScreen}
  />
);

export const SerialsNavigator = () => (
  <StackScreenBuilder
    screenName='Serials'
    screenTitle='Сериалы'
    component={SerialsScreen}
  />
);

export const ShowNavigator = () => (
  <StackScreenBuilder
    screenName='Show'
    screenTitle='ТВ'
    component={ShowScreen}
  />
);

export const AnimeNavigator = () => (
  <StackScreenBuilder
    screenName='Anime'
    screenTitle='Аниме'
    component={AnimeScreen}
  />
);

export const AnimeSerialsNavigator = () => (
  <StackScreenBuilder
    screenName='AnimeSerials'
    screenTitle='Аниме Серии'
    component={AnimeSerialsScreen}
  />
);

export const CartoonNavigator = () => (
  <StackScreenBuilder
    screenName='Cartoon'
    screenTitle='Мульты'
    component={CartoonScreen}
  />
);

export const CartoonSerialsNavigator = () => (
  <StackScreenBuilder
    screenName='CartoonSerials'
    screenTitle='Мульт Серии'
    component={CartoonSerialsScreen}
  />
);
