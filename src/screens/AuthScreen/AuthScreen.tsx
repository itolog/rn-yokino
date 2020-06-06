import React, { useCallback, useState, memo, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import LogIn from '../../components/Auth/LogIn/LogIn';
import Registration from '../../components/Auth/Registration/Registration';

import { THEMES } from '../../shared/constants/themes';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: THEMES.AUTH_BG,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AuthScreen = memo(() => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const [authError, setAuthError] = useState('');

  // Display AUTH ERROR TO HEader
  useEffect(() => {
    if (authError) {
      navigation.setOptions({
        title: authError,
        headerTitleStyle: {
          fontSize: 14,
        },
        headerStyle: {
          backgroundColor: COLORS.DANGER_COLOR,
          height: THEMES.HEADER_SIZE,
        },
      });
    } else {
      navigation.setOptions({
        title: 'Авторизация',
        headerTitleStyle: {
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: COLORS.MAIN_COLOR,
          height: THEMES.HEADER_SIZE,
        },
      });
    }
  }, [authError, navigation]);

  const toggleVisible = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setVisible(!visible);
    setAuthError('');
  }, [visible]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {visible && <LogIn setError={setAuthError} />}
        {!visible && <Registration setError={setAuthError} />}

        <Button
          onPress={toggleVisible}
          title={visible ? 'зарегистрироваться' : 'войти'}
          type='outline'
        />
      </ScrollView>
    </SafeAreaView>
  );
});

export default AuthScreen;
