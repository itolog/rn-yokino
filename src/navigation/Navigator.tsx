import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Icon } from 'react-native-elements';

import FilmsScreen from '../screens/FilmsScreen/FilmsScreen';
import SerialsScreen from '../screens/SerialsScreen/SerialsScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen/MovieDetailsScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { COLORS } from '../shared/constants/colors';
import AppHeaderButton from '../shared/components/AppHeaderButton/AppHeaderButton';

const Drawer = createDrawerNavigator();
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

const FilmsNavigator = () => {
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

const SerialsNavigator = () => {
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

const FavoritesNavigator = () => {
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

const SettingsNavigator = () => {
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

const Navigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: 'black',
            activeBackgroundColor: 'white',
            inactiveTintColor: '#83d2c5',
            labelStyle: { fontSize: 18 },
          }}
          drawerStyle={{
            backgroundColor: COLORS.MAIN_COLOR,
          }}
          drawerPosition='left'
          drawerType='back'
          screenOptions={{
            unmountOnBlur: true,
          }}>
          <Drawer.Screen
            name='Films'
            component={FilmsNavigator}
            options={{
              drawerLabel: 'Фильмы',
              drawerIcon: () => (
                <Icon reverse name='film' type='font-awesome' color='#00BBD5' />
              ),
            }}
          />
          <Drawer.Screen
            name='Serials'
            component={SerialsNavigator}
            options={{
              drawerLabel: 'Сериалы',
              drawerIcon: () => (
                <Icon reverse name='film' type='font-awesome' color='#EB1561' />
              ),
            }}
          />
          <Drawer.Screen
            name='Favorites'
            component={FavoritesNavigator}
            options={{
              drawerLabel: 'Избранное',
              drawerIcon: () => (
                <Icon
                  reverse
                  name='heartbeat'
                  type='font-awesome'
                  color='#f50'
                />
              ),
            }}
          />
          <Drawer.Screen
            name='Настройки'
            component={SettingsNavigator}
            options={{
              drawerLabel: 'Настройки',
              drawerIcon: () => (
                <Icon reverse name='cogs' type='font-awesome' color='#6734BA' />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
