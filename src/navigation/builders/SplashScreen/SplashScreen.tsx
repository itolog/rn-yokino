import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.MENU_COLOR,
    fontWeight: 'bold',
    fontSize: 30,
  },
});

const SplashScreen = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YOKINO</Text>
    </View>
  );
});

export default SplashScreen;
