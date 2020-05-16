import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailsScreen from '../screens/MovieDetailsScreen/MovieDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

import { COLORS } from '../shared/constants/colors';

const Stack = createStackNavigator();

interface Props {
  children: JSX.Element[] | JSX.Element;
  name: string;
}

const DETAILS_TITLE = '';

const detailScreenConfigure = {
  headerStatusBarHeight: 0,
  title: DETAILS_TITLE,
  headerShown: false,
  headerBackImage: () => (
    <Icon color='orange' size={46} name='ios-arrow-back' type='ionicon' />
  ),
  headerStyle: {
    backgroundColor: COLORS.MAIN_COLOR,
  },
};

const WrappStackNavigator: React.FC<Props> = ({ children, name }) => {
  return (
    <Stack.Navigator initialRouteName={name}>
      {children}
      <Stack.Screen
        name='Details'
        component={MovieDetailsScreen}
        options={detailScreenConfigure}
      />
      <Stack.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          title: 'Избранное',
        }}
      />
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: 'Настройки',
        }}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          title: 'Поиск',
        }}
      />
    </Stack.Navigator>
  );
};

export default WrappStackNavigator;
