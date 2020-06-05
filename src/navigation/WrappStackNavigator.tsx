import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailsScreen from '../screens/MovieDetailsScreen/MovieDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

import { COLORS } from '../shared/constants/colors';

const Stack = createStackNavigator();

interface Props {
  children: JSX.Element[] | JSX.Element;
  name: string;
}

const DETAILS_TITLE = 'YOKINO';

const detailScreenConfigure = {
  title: DETAILS_TITLE,
  headerShown: false,
  headerBackImage: () => (
    <Icon color='orange' size={46} name='ios-arrow-back' type='ionicon' />
  ),
};
const WrappStackNavigator: React.FC<Props> = ({ children, name }) => {
  return (
    <Stack.Navigator
      headerMode='float'
      screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: COLORS.MAIN_COLOR,
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
