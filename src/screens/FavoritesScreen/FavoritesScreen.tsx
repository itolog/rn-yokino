import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Card, Button, Icon } from 'react-native-elements';
import styles from './styles';

import ErrorOverlay from '../../shared/components/ErrorOverlay/ErrorOverlay';
// store
import { Actions } from '../../store/favorites-movies/actions';
import {
  getFavoritesMovies,
  getErrorFavorites,
} from '../../store/favorites-movies/selectors';

import BgImage from '../../shared/UI/BgImage/BgImage';

interface Favorite {
  id: number;
  poster: string;
  title: string;
}

const FavoritesScreen = memo(() => {
  // Store
  const favorites = useSelector(getFavoritesMovies);
  const errorFavorites = useSelector(getErrorFavorites);

  const dispatch = useDispatch();
  // Navigation
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(Actions.loadFavorite());
  }, [favorites, dispatch]);

  const emptyList = () => {
    return (
      <Card title='Список пуст'>
        <Text>В избранное ничего не добавлено.</Text>
      </Card>
    );
  };

  const toDetails = (id: number) => {
    navigation.navigate('Details', { id });
  };

  const renderItem = ({ item }: { item: Favorite }) => {
    const removeFavorite = () => {
      dispatch(Actions.removeFavoriteMovie(item.id));
    };

    const navigateToDetails = () => {
      toDetails(item.id);
    };

    return (
      <Card title={item.title} image={{ uri: item.poster }}>
        <View style={styles.btns}>
          <Button
            icon={<Icon name='delete' color='#ffffff' />}
            buttonStyle={styles.delete}
            onPress={removeFavorite}
          />
          <Button
            icon={<Icon name='eye' color='#ffffff' type='font-awesome' />}
            buttonStyle={styles.see}
            onPress={navigateToDetails}
          />
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <BgImage>
        {/*  ErrorOverlay */}
        <ErrorOverlay
          visible={!!errorFavorites}
          message={errorFavorites}
          locationError='экран FavoritesScreen.tsx'
        />
        <FlatList
          style={styles.flatList}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          numColumns={1}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={40}
          initialNumToRender={6}
          windowSize={11}
          ListEmptyComponent={emptyList}
        />
      </BgImage>
    </View>
  );
});

export default FavoritesScreen;
