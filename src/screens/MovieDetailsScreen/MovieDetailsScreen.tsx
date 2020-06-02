import React, { memo, useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScaledSize,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';

import MovieDetailsHeader from './MovieDetailsHeader/MovieDetailsHeader';
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
  const navigation = useNavigation();

  const [isStatusBarHide, setIsStatusBarHide] = useState(false);
  const [deviceWidth] = useState<number>(Dimensions.get('screen').width);

  const ref = useRef<ScrollView>(null);
  const id = Number(route.params?.id);

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

  const scrollTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ x: 1, y: 0, animated: true });
    }
  };

  const handleBack = () => {
    requestAnimationFrame(() => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    const orientationHandler = ({ screen }: { screen: ScaledSize }) => {
      if (screen.width > deviceWidth) {
        setIsStatusBarHide(true);
      } else {
        setIsStatusBarHide(false);
      }
    };

    Dimensions.addEventListener('change', orientationHandler);

    return () => {
      Dimensions.removeEventListener('change', orientationHandler);
    };
  }, [deviceWidth]);

  const content = () => {
    if (error) {
      return <ErrorBox msg={error?.message} />;
    }
    return (
      <ScrollView ref={ref}>
        {!loading ? (
          <>
            <MovieDetailsHeader
              title={movie.name ?? ''}
              backHandler={handleBack}
            />
            <VideoInfo data={movie}>
              <Player src={movie?.iframe_url} id={movie?.kinopoisk_id} />
            </VideoInfo>

            {!!PartsList()?.length && (
              <View style={styles.partsContainer}>
                <Text style={styles.partsTitle}>Рекомендуем посмотреть</Text>
                <FlatList
                  horizontal={true}
                  data={PartsList()}
                  keyExtractor={(item: any) => item.toLocaleString()}
                  renderItem={({ item }) => (
                    <PartsCard scrollTop={scrollTop} id={item} />
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
      <StatusBar hidden={isStatusBarHide} translucent={isStatusBarHide} />
      {content()}
    </SafeAreaView>
  );
});

export default MovieDetailsScreen;
