import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/constants/colors';

interface Props {
  message: string;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    width: '100%',
    zIndex: 20,
  },
  errMsg: {
    color: 'white',
    padding: 5,
    borderRadius: 5,
    backgroundColor: COLORS.DANGER_COLOR,
  },
});

const AuthError: React.FC<Props> = ({ message }) => {
  const error = message.split(':')[1];
  return (
    <View style={styles.container}>
      <Text style={styles.errMsg}>{error}</Text>
    </View>
  );
};

export default AuthError;
