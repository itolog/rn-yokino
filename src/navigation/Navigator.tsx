import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Icon } from 'react-native-elements';

import { COLORS } from '../shared/constants/colors';
import {
  AnimeNavigator, AnimeSerialsNavigator,
  FavoritesNavigator,
  FilmsNavigator,
  SerialsNavigator,
  SettingsNavigator,
  ShowNavigator,
} from './StackNavigator';

const Drawer = createDrawerNavigator();

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
            name='Show'
            component={ShowNavigator}
            options={{
              drawerLabel: 'ТВ',
              drawerIcon: () => (
                <Icon reverse name='film' type='font-awesome' color='#00008b' />
              ),
            }}
          />
          <Drawer.Screen
            name='Anime'
            component={AnimeNavigator}
            options={{
              drawerLabel: 'Аниме',
              drawerIcon: () => (
                <Icon reverse name='film' type='font-awesome' color='#ff00ff' />
              ),
            }}
          />
          <Drawer.Screen
            name='AnimeSerials'
            component={AnimeSerialsNavigator}
            options={{
              drawerLabel: 'Аниме Серии',
              drawerIcon: () => (
                <Icon reverse name='film' type='font-awesome' color='#ff00ff' />
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
