import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    backgroundColor: 'rgb(18,40,35)',
    borderColor: 'white',
    borderWidth: 2,
    width: '100%',
    textAlign: 'center',
    color: 'orange',
    padding: 40,
  },
});

const EmptyData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noData}>ничего не найдено</Text>
    </View>
  );
};

export default EmptyData;
