import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
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
import { GET_MOVIE } from './ggl';
import { MovieInfo } from '../../shared/generated/graphql';

import styles from './styles';
import { COLORS } from '../../shared/constants/colors';

type RootStackParamList = {
  Details: { id: number };
};
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
}

const MovieDetailsScreen = ({ route }: Props) => {
  const id = Number(route.params?.id);

  const navigation = useNavigation();

  const [isStatusBarHide, setIsStatusBarHide] = useState(false);

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  const movie: MovieInfo = data?.movieInfo;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y > 200) {
      setIsStatusBarHide(true);
    } else if (event.nativeEvent.contentOffset.y < 200) {
      setIsStatusBarHide(false);
    }
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
      <ScrollView onScroll={handleScroll}>
        {!loading ? (
          <>
            <Button
              title='НАЗАД'
              onPress={handleBack}
              buttonStyle={styles.backBtn}
            />
            <VideoInfo data={movie} />
            <Player src={movie?.iframe_url} id={movie?.kinopoisk_id} />
          </>
        ) : (
          <Loader />
        )}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={isStatusBarHide}
        animated={true}
        showHideTransition='fade'
        barStyle='light-content'
        backgroundColor={COLORS.MAIN_COLOR}
      />
      {content()}
    </SafeAreaView>
  );
};

export default MovieDetailsScreen;
