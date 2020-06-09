import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

interface Props {
  msg: string;
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 4,
  },
});

const ErrorBox: React.FC<Props> = memo(({ msg }) => {
  return (
    <Card title='Ошибка' containerStyle={styles.container}>
      <Text>{msg}</Text>
    </Card>
  );
});
export default ErrorBox;
