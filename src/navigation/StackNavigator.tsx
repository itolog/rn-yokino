import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppHeaderButton from './AppHeaderButton/AppHeaderButton';
import FilmsScreen from '../screens/FilmsScreen/FilmsScreen';
import SerialsScreen from '../screens/SerialsScreen/SerialsScreen';
import ShowScreen from '../screens/ShowScreen/ShowScreen';
import AnimeScreen from '../screens/AnimeScreen/AnimeScreen';
import AnimeSerialsScreen from '../screens/AnimeSerialsScreen/AnimeSerialsScreen';
import CartoonScreen from '../screens/CartoonScreen/CartoonScreen';
import CartoonSerialsScreen from '../screens/CartoonSerialsScreen/CartoonSerialsScreen';

import WrappStackNavigator from './WrappStackNavigator';

const Stack = createStackNavigator();

const appHeaderButton = (navigation: any) => (
  <AppHeaderButton onPress={navigation.toggleDrawer} />
);

export const FilmsNavigator = () => {
  return (
    <WrappStackNavigator name='Films'>
      <Stack.Screen
        name='Films'
        component={FilmsScreen}
        options={({ navigation }) => ({
          title: 'Фильмы',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};

export const SerialsNavigator = () => {
  return (
    <WrappStackNavigator name='Serials'>
      <Stack.Screen
        name='Serials'
        component={SerialsScreen}
        options={({ navigation }) => ({
          title: 'Сериалы',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};

export const ShowNavigator = () => {
  return (
    <WrappStackNavigator name='Show'>
      <Stack.Screen
        name='Show'
        component={ShowScreen}
        options={({ navigation }) => ({
          title: 'ТВ',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};
// ANIME SCREEN
export const AnimeNavigator = () => {
  return (
    <WrappStackNavigator name='Anime'>
      <Stack.Screen
        name='Anime'
        component={AnimeScreen}
        options={({ navigation }) => ({
          title: 'Аниме',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};

export const AnimeSerialsNavigator = () => {
  return (
    <WrappStackNavigator name='AnimeSerials'>
      <Stack.Screen
        name='AnimeSerials'
        component={AnimeSerialsScreen}
        options={({ navigation }) => ({
          title: 'Аниме Серии',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};

export const CartoonNavigator = () => {
  return (
    <WrappStackNavigator name='Cartoon'>
      <Stack.Screen
        name='Cartoon'
        component={CartoonScreen}
        options={({ navigation }) => ({
          title: 'Мульты',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};

export const CartoonSerialsNavigator = () => {
  return (
    <WrappStackNavigator name='CartoonSerials'>
      <Stack.Screen
        name='CartoonSerials'
        component={CartoonSerialsScreen}
        options={({ navigation }) => ({
          title: 'Мульт Серии',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </WrappStackNavigator>
  );
};
