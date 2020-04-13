import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Card, Button, Icon } from 'react-native-elements';
import styles from './styles';

import ErrorOverlay from '../../shared/components/ErrorOverlay/ErrorOverlay';
// store
import { AppState } from '../../store/createStore';
import { Actions } from '../../store/favorites-movies/actions';
import {
  getFavoritesMovies,
  getErrorFavorites,
} from '../../store/favorites-movies/selectors';
import posterUrl from '../../shared/utils/posterUrl';
import BgImage from '../../shared/components/BgImage/BgImage';

const mapStateToProps = (state: AppState) => {
  return {
    favorites: getFavoritesMovies(state),
    errorFavorites: getErrorFavorites(state),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadDB: () => dispatch(Actions.loadFavorite()),
  removeItems: (id: number) => dispatch(Actions.removeFavoriteMovie(id)),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const FavoritesScreen = ({
  loadDB,
  removeItems,
  favorites,
  errorFavorites,
}: Props) => {
  const navigation = useNavigation();
  useEffect(() => {
    loadDB();
    console.log(favorites)
  }, [favorites, loadDB]);

  const emptyList = () => {
    return (
      <Card title='Список пуст'>
        <Text>В избранное ничего не добавлено.</Text>
      </Card>
    );
  };

  const toDetails = (id: number) => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { id });
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <Card title={item.name} image={{ uri: posterUrl(item.id) }}>
        <View style={styles.btns}>
          <Button
            icon={<Icon name='delete' color='#ffffff' />}
            buttonStyle={styles.delete}
            onPress={() => removeItems(item.id_movie)}
          />
          <Button
            icon={<Icon name='eye' color='#ffffff' type='font-awesome' />}
            buttonStyle={styles.see}
            onPress={() => toDetails(item.id_movie)}
          />
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
          keyExtractor={(item: any) => item.kp_id}
          numColumns={1}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={40}
          initialNumToRender={6}
          windowSize={11}
          ListEmptyComponent={emptyList}
        />
      </BgImage>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
