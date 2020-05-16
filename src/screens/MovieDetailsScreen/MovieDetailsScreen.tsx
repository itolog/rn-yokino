import React, { memo } from 'react';
import {
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';

import { Button } from 'react-native-elements';
import ErrorBox from '../../shared/components/ErrorBox/ErrorBox';
import VideoInfo from '../../components/VideoInfo/VideoInfo';
import Player from '../../components/Player/Player';
import Loader from '../../shared/UI/Loader/Loader';
import PartsCard from '../../components/PartsCard/PartsCard';
import { GET_MOVIE } from './ggl';
import { MovieInfo } from '../../shared/generated/graphql';

import styles from './styles';

type RootStackParamList = {
  Details: { id: number };
};
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
}

const MovieDetailsScreen = memo(({ route }: Props) => {
  const id = Number(route.params?.id);

  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  const movie: MovieInfo = data?.movieInfo;

  const PartsList = () => {
    if (movie.parts?.length) {
      return movie.parts?.filter(item => item !== id);
    }
    return [];
  };
  const handleBack = () => {
    requestAnimationFrame(() => {
      navigation.goBack();
    });
  };

  const content = () => {
    if (error) {
      return <ErrorBox msg={error?.message} />;
    }
    return (
      <ScrollView>
        {!loading ? (
          <>
            <Button
              title='НАЗАД'
              onPress={handleBack}
              buttonStyle={styles.backBtn}
            />
            <VideoInfo data={movie} />
            <Player src={movie?.iframe_url} id={movie?.kinopoisk_id} />

            {!!PartsList()?.length && (
              <View style={styles.partsContainer}>
                <Text style={styles.partsTitle}>Рекомендуем посмотреть</Text>
                <FlatList
                  horizontal={true}
                  data={PartsList()}
                  keyExtractor={(item: any) => item.toLocaleString()}
                  renderItem={({ item }) => (
                    <PartsCard id={item} />
                  )}
                />
              </View>
            )}
          </>
        ) : (
          <Loader />
        )}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {content()}
    </SafeAreaView>
  );
});

export default MovieDetailsScreen;
