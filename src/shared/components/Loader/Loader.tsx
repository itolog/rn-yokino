import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081C24',
  },
});

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='orange' />
    </View>
  );
};

export default Loader;
