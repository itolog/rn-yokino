import React from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useQuery } from '@apollo/react-hooks';
import { GET_MOVIE } from '../../screens/MovieDetailsScreen/ggl';
import { MovieInfo } from '../../shared/generated/graphql';
import { COLORS } from '../../shared/constants/colors';

interface Props {
  id: number;
  scrollTop: () => void;
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    margin: 7,
  },
  poster: {
    height: 280,
  },
  pressBtn: { backgroundColor: COLORS.BUTTON_PARTS },
});

const PartsCard: React.FC<Props> = ({ id, scrollTop }) => {
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  const movie: MovieInfo = data && data.movieInfo;

  if (error) return null;

  if (loading) return <ActivityIndicator size='small' color='#00ff00' />;

  const handlePress = () => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { id });
      scrollTop();
    });
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.poster}
        source={{
          uri: movie.poster || '',
        }}
      />
      <Button
        onPress={handlePress}
        // icon={<Icon name='eye' size={30} color={COLORS.MENU_COLOR} />}
        buttonStyle={styles.pressBtn}
        title='перейти'
      />
    </View>
  );
};

export default PartsCard;
