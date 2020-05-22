import React, { memo, useRef, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  View,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
  const navigation = useNavigation();

  const [isStatusBarHide, setIsStatusBarHide] = useState(false);
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    requestAnimationFrame(() => {
      if (nativeEvent.contentOffset.y > 200) {
        setIsStatusBarHide(true);
      } else if (nativeEvent.contentOffset.y < 200) {
        setIsStatusBarHide(false);
      }
    });
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
      <ScrollView ref={ref} onScroll={handleScroll}>
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
      <StatusBar hidden={isStatusBarHide} />
      {content()}
    </SafeAreaView>
  );
});

export default MovieDetailsScreen;
