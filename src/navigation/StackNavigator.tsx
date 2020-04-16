import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import AppHeaderButton from '../shared/components/AppHeaderButton/AppHeaderButton';
import { COLORS } from '../shared/constants/colors';
import FilmsScreen from '../screens/FilmsScreen/FilmsScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen/MovieDetailsScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import SerialsScreen from '../screens/SerialsScreen/SerialsScreen';
import ShowScreen from '../screens/ShowScreen/ShowScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

const Stack = createStackNavigator();

const DETAILS_TITLE = '';

const appHeaderButton = (navigation: any) => (
  <AppHeaderButton
    onPress={navigation.toggleDrawer}
    name='ios-menu'
    raised
    color={COLORS.MENU_COLOR}
  />
);
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

export const FilmsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Films'>
      <Stack.Screen
        name='Films'
        component={FilmsScreen}
        options={({ navigation }) => ({
          title: 'Фильмы',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
      <Stack.Screen
        name='Details'
        component={MovieDetailsScreen}
        options={detailScreenConfigure}
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

export const SerialsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Serials'>
      <Stack.Screen
        name='Serials'
        component={SerialsScreen}
        options={({ navigation }) => ({
          title: 'Сериалы',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
      <Stack.Screen
        name='Details'
        component={MovieDetailsScreen}
        options={detailScreenConfigure}
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

export const ShowNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Show'>
      <Stack.Screen
        name='Show'
        component={ShowScreen}
        options={({ navigation }) => ({
          title: 'ТВ',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
      <Stack.Screen
        name='Details'
        component={MovieDetailsScreen}
        options={detailScreenConfigure}
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

export const FavoritesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Favorites'>
      <Stack.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={({ navigation }) => ({
          title: 'Избранное',
          headerRight: () => appHeaderButton(navigation),
        })}
      />
      <Stack.Screen
        name='Details'
        component={MovieDetailsScreen}
        options={detailScreenConfigure}
      />
    </Stack.Navigator>
  );
};

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Settings'>
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Настройки',
          drawerLabel: 'Настройки',
          drawerIcon: () => (
            <Icon reverse name='cogs' type='font-awesome' color='#6734BA' />
          ),
          headerRight: () => appHeaderButton(navigation),
        })}
      />
    </Stack.Navigator>
  );
};
