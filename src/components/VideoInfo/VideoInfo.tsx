import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ActivityIndicator } from 'react-native';
import { Icon, Image, AirbnbRating } from 'react-native-elements';
import { MovieInfo } from '../../shared/generated/graphql';
import ErrorOverlay from '../../shared/components/ErrorOverlay/ErrorOverlay';

import styles from './styles';

import IsEmpty from '../../shared/components/IsEmpty/IsEmpty';
// store
import { AppState } from '../../store/createStore';
import {
  getFavoriteMoviesIds,
  getErrorFavorites,
} from '../../store/favorites-movies/selectors';
import { Actions } from '../../store/favorites-movies/actions';

import { Favorites } from '../../shared/interface/favorites';

interface IProps {
  data: MovieInfo;
}

const mapStateToProps = (state: AppState) => {
  return {
    favoriteMoviesIds: getFavoriteMoviesIds(state),
    errorFavorites: getErrorFavorites(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDB: () => dispatch(Actions.loadFavorite()),
  saveMovie: (payload: Favorites) =>
    dispatch(Actions.saveFavoriteMovie(payload)),
  removeMovie: (payload: number) =>
    dispatch(Actions.removeFavoriteMovie(payload)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const VideoInfo: React.FC<Props> = ({
  data,
  saveMovie,
  loadDB,
  removeMovie,
  favoriteMoviesIds,
  errorFavorites,
}) => {
  const [favorites, setFavorites] = useState(false);

  const poster = data?.poster!;

  useEffect(() => {
    loadDB();
  }, [loadDB]);

  useEffect(() => {
    // @ts-ignore
    const is = favoriteMoviesIds.includes(data?.id);
    setFavorites(is);
  }, [favoriteMoviesIds, data]);

  const addFavorites = async () => {
    if (data.name && data.id) {
      const payload = {
        title: data.name,
        id_movie: data.id,
      };
      await saveMovie(payload);
    }
  };

  const removeFavorites = async () => {
    if (data.id) {
      await removeMovie(data.id);
    }
  };

  const toggleFavorite = () => {
    const rait = Number(data?.kinopoisk) || 0;
    if (favorites) {
      return (
        <View style={styles.favorites}>
          <IsEmpty val={data?.kinopoisk}>
            <AirbnbRating
              count={10}
              defaultRating={rait}
              size={18}
              reviews={[]}
              isDisabled={true}
            />
          </IsEmpty>
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
        <IsEmpty val={data.kinopoisk}>
          <AirbnbRating
            count={10}
            defaultRating={rait}
            size={18}
            reviews={[]}
            isDisabled={true}
          />
        </IsEmpty>
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
      {toggleFavorite()}
      {/* Title */}
      <IsEmpty val={data.name}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Название</Text>
          {data.name && <Text style={styles.sectionText}>{data.name}</Text>}
          {data.name_eng && (
            <Text style={styles.sectionText}>{data.name_eng}</Text>
          )}
        </View>
      </IsEmpty>

      {/* DATE */}
      <IsEmpty val={data.year}>
        <View style={styles.oneLineSection}>
          <Text style={styles.sectionTitle}>Дата выхода</Text>
          <Text style={styles.sectionTitleOneLine}>{data.year}</Text>
        </View>
      </IsEmpty>
      {/* GENRES */}
      {data?.genre?.length !== 0 && (
        <IsEmpty val={data?.genre}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Жанр</Text>
            {data?.genre?.map((item: string, index: number) => {
              return (
                <Text key={index} style={styles.sectionText}>
                  {item}
                </Text>
              );
            })}
          </View>
        </IsEmpty>
      )}
      {/*  Description */}
      <IsEmpty val={data.description}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Описание</Text>
          <Text style={styles.sectionText}>{data?.description}</Text>
        </View>
      </IsEmpty>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoInfo);
