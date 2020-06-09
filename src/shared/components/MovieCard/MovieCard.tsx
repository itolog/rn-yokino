import React, { memo } from 'react';

import { Text, View, TouchableHighlight } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
  id: number;
  title: string;
  year: number;
  poster: string;
  kp?: string;
  imdb?: string;
  quality?: string;
}

const MovieCard = memo(
  ({ poster, id, title, year, kp, imdb, quality }: Props) => {
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
            <View style={styles.raitWrapp}>
              {imdb && <Text style={styles.raitTextImdb}>imdb</Text>}
              <Text style={styles.raitTextImdb}>{imdb}</Text>
            </View>
            <FastImage
              style={styles.img}
              source={{
                uri: poster,
                priority: FastImage.priority.normal,
              }}
            />
            <View style={styles.raitWrapp}>
              {kp && <Text style={styles.raitTextKp}>kp</Text>}
              <Text style={styles.raitTextKp}>{kp}</Text>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.year}>{year}</Text>
            <Text style={styles.quality}>{quality}</Text>
          </View>
        </>
      </TouchableHighlight>
    );
  },
);

export default MovieCard;
