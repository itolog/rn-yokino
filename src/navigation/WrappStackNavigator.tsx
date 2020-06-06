import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailsScreen from '../screens/MovieDetailsScreen/MovieDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

import { COLORS } from '../shared/constants/colors';
import { THEMES } from '../shared/constants/themes';

const Stack = createStackNavigator();

interface Props {
  children: JSX.Element[] | JSX.Element;
  name: string;
}

const DETAILS_TITLE = 'YOKINO';

const detailScreenConfigure = {
  title: DETAILS_TITLE,
  headerShown: false,
};
const WrappStackNavigator: React.FC<Props> = ({ children, name }) => {
  return (
    <Stack.Navigator
      headerMode='float'
      mode='modal'
      screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: COLORS.MAIN_COLOR,
          height: THEMES.HEADER_SIZE,
        },
      }}
      initialRouteName={name}>
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
      <Stack.Screen
        name='Auth'
        component={AuthScreen}
        options={{
          title: 'Авторизация',
        }}
      />
    </Stack.Navigator>
  );
};

export default WrappStackNavigator;
