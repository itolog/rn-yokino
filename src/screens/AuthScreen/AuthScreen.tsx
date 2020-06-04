import React, { useCallback, useState, memo, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';

import { useSelector } from 'react-redux';
import LogIn from '../../components/Auth/LogIn/LogIn';
import Registration from '../../components/Auth/Registration/Registration';

import { THEMES } from '../../shared/constants/themes';
import { AppState } from '../../store/createStore';

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
  const user = useSelector((state: AppState) => state.user);
  const [visible, setVisible] = useState(true);

  const toggleVisible = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setVisible(!visible);
  }, [visible]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {visible && <LogIn />}
        {!visible && <Registration />}

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
