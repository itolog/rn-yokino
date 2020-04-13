import React from 'react';

import { Text, View, TouchableHighlight } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
  id: number;
  title: string;
  year: number;
  poster: string;
}

const MovieCard = React.memo(({ poster, id, title, year }: Props) => {
  const navigation = useNavigation();
  const toDetails = () => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { id });
    });
  };

  return (
    <TouchableHighlight
      underlayColor='rgba(0, 0, 0, 0.4)'
      style={styles.container}
      onPress={toDetails}>
      <>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.wrappImg}>
          <FastImage
            style={styles.img}
            source={{
              uri: poster,
              priority: FastImage.priority.normal,
            }}
          />
        </View>

        <Text style={styles.year}>{year}</Text>
      </>
    </TouchableHighlight>
  );
});

export default MovieCard;
