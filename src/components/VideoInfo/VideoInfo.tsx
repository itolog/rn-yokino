import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, ActivityIndicator } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { MovieInfo } from '../../shared/generated/graphql';
import ErrorOverlay from '../../shared/components/ErrorOverlay/ErrorOverlay';

import styles from './styles';

import IsEmpty from '../../shared/components/IsEmpty/IsEmpty';
// store
import {
  getFavoriteMoviesIds,
  getErrorFavorites,
} from '../../store/favorites-movies/selectors';
import { Actions } from '../../store/favorites-movies/actions';

interface Props {
  data: MovieInfo;
  children: React.ReactElement | React.ReactElement[];
}

const VideoInfo: React.FC<Props> = memo(({ data, children }) => {
  // store
  const favoriteMoviesIds = useSelector(getFavoriteMoviesIds);
  const errorFavorites = useSelector(getErrorFavorites);

  const dispatch = useDispatch();
  // local state
  const [favorites, setFavorites] = useState(false);

  const poster = data?.poster!;

  useEffect(() => {
    dispatch(Actions.loadFavorite());
  }, [dispatch]);

  useEffect(() => {
    // @ts-ignore
    const is = favoriteMoviesIds.includes(data?.id);
    setFavorites(is);
  }, [favoriteMoviesIds, data]);

  const addFavorites = () => {
    requestAnimationFrame(() => {
      if (data.name && data.id && data.poster) {
        const payload = {
          title: data.name,
          id: data.id,
          poster: data.poster,
        };
        dispatch(Actions.saveFavoriteMovie(payload));
      }
    });
  };

  const removeFavorites = () => {
    requestAnimationFrame(() => {
      if (data.id) {
        dispatch(Actions.removeFavoriteMovie(data.id));
      }
    });
  };

  const starRaitComponent = () => (
    <View style={styles.sectionRait}>
      <IsEmpty val={data.kinopoisk}>
        <View style={styles.sectionRaitContent}>
          <Icon
            name='star'
            type='ionicone'
            color='green'
            size={22}
            onPress={removeFavorites}
          />
          <Text style={styles.raitKp}>kp : {data.kinopoisk}</Text>
        </View>
      </IsEmpty>
      <IsEmpty val={data.imdb}>
        <View style={styles.sectionRaitContent}>
          <Icon
            name='star'
            type='ionicone'
            color='orange'
            size={22}
            onPress={removeFavorites}
          />
          <Text style={styles.raitImdb}>imdb : {data.imdb}</Text>
        </View>
      </IsEmpty>
    </View>
  );

  const toggleFavorite = () => {
    if (favorites) {
      return (
        <View style={styles.favorites}>
          {starRaitComponent()}
          <Icon
            raised
            name='bookmark'
            type='ionicone'
            color='#f50'
            onPress={removeFavorites}
          />
        </View>
      );
    }
    return (
      <View style={styles.favorites}>
        {starRaitComponent()}
        <Icon
          raised
          name='bookmark-border'
          type='ionicone'
          color='#f50'
          onPress={addFavorites}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/*  ErrorOverlay */}
      <ErrorOverlay
        visible={!!errorFavorites}
        message={errorFavorites}
        locationError='компонент VideoInfo.tsx, экран MovieDetailsScreen.tsx'
      />
      {/* POSTER */}
      <Image
        placeholderStyle={styles.placeholder}
        resizeMode='cover'
        progressiveRenderingEnabled={true}
        resizeMethod='resize'
        source={{
          uri: poster,
        }}
        style={styles.img}
        PlaceholderContent={<ActivityIndicator />}
      />

      {/* PLAYER */}
      {children}
      {toggleFavorite()}
      {/* Title */}
      <IsEmpty val={data.name}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Название</Text>
          {data.name && <Text style={styles.sectionText}>{data.name}</Text>}
          {data.name_eng ? (
            <Text style={styles.sectionText}>{data.name_eng}</Text>
          ) : null}
        </View>
      </IsEmpty>

      {/* DATE */}
      <IsEmpty val={data.year}>
        <View style={styles.oneLineSection}>
          <Icon size={26} name='date-range' onPress={removeFavorites} />
          <Text style={styles.sectionTitleOneLine}>{data.year}</Text>
        </View>
      </IsEmpty>
      {/* DURATION */}
      <IsEmpty val={data.time}>
        <View style={styles.oneLineSection}>
          <Icon size={26} name='timer' onPress={removeFavorites} />
          <Text style={styles.sectionTitleOneLine}>
            {data?.time?.split('/')[0]}
          </Text>
        </View>
      </IsEmpty>
      {/* GENRES */}
      {data?.genre?.length !== 0 && (
        <IsEmpty val={data?.genre}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Жанр</Text>
            <View style={styles.sectionRow}>
              {data?.genre?.map((item: string, index: number) => {
                return (
                  <Text key={index} style={styles.sectionText}>
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>
        </IsEmpty>
      )}
      {/*  Actors */}

      <IsEmpty val={data?.actors}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Актёры</Text>
          <View style={styles.section}>
            {data?.actors?.map((item: string, index: number) => {
              return (
                <Text key={index} style={styles.sectionText}>
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
      </IsEmpty>

      {/*  Description */}
      <IsEmpty val={data.description}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Описание</Text>
          <Text style={styles.sectionText}>{data?.description}</Text>
        </View>
      </IsEmpty>
    </View>
  );
});

export default VideoInfo;
