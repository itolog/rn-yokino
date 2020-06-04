import React, { memo } from 'react';
import { Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AppHeaderButton from './AppHeaderButton/AppHeaderButton';
import WrappStackNavigator from '../WrappStackNavigator';

// STORE
import { isUserLogged } from '../../store/user/selectors';
import { Actions } from '../../store/user/actions';

import { COLORS } from '../../shared/constants/colors';

const Stack = createStackNavigator();

interface Props {
  screenName: string;
  screenTitle: string;
  component: any;
}

const StackScreenBuilder: React.FC<Props> = memo(
  ({ screenName, screenTitle, component }) => {
    const isLogin = useSelector(isUserLogged);
    const dispatch = useDispatch();

    const route = useNavigation();

    const toAuthScreen = () => {
      route.navigate('Auth');
    };

    const logOut = () => {
      Alert.alert(
        'Выход из аккаунта',
        'Вы точно хотите выйти?',
        [
          {
            text: 'Отмена',
            onPress: () => {},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => dispatch(Actions.removeUser()) },
        ],
        { cancelable: false },
      );
    };

    const auth = () => {
      if (!isLogin) {
        return (
          <AppHeaderButton
            color={COLORS.slateblue}
            name='ios-log-in'
            onPress={toAuthScreen}
          />
        );
      }
      return (
        <AppHeaderButton
          color={COLORS.DANGER_COLOR}
          name='ios-log-out'
          onPress={logOut}
        />
      );
    };

    return (
      <WrappStackNavigator name={screenName}>
        <Stack.Screen
          name={screenName}
          component={component}
          options={({ navigation }) => ({
            title: `${screenTitle}`,
            headerLeft: () => auth(),
            headerRight: () => (
              <AppHeaderButton
                color={COLORS.MENU_COLOR}
                name='ios-menu'
                onPress={navigation.toggleDrawer}
              />
            ),
          })}
        />
      </WrappStackNavigator>
    );
  },
);

export default StackScreenBuilder;
