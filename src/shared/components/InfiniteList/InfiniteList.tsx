import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputScrollEventData,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../../../store/animation/actions';
import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../generated/graphql';
import { THEMES } from '../../constants/themes';
import { AppState } from '../../../store/createStore';

interface Props {
  data: Movie[] | [];
  loading: boolean;
  year: number;
  refresh: () => void;
  loadMore: () => void;
  nextPageUrl: string;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: THEMES.HEADER_SIZE,
  },
  colStyle: {
    justifyContent: 'center',
  },
  footerText: {
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 5,
  },
});

const InfiniteList: React.FC<Props> = React.memo(
  ({ data, loading, refresh, loadMore, year, nextPageUrl }) => {
    const dispatch = useDispatch();
    const isHide = useSelector(
      (state: AppState) => state.animState.isHeaderVisible,
    );
    const flatRef = useRef<FlatList<any>>(null);
    const [dataMovie, setDataMovie] = useState(data);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      setDataMovie(data);
    }, [data, dataMovie]);

    const footer = () => {
      if (nextPageUrl === null) {
        return (
          <Card title='Конец списка'>
            <Text style={styles.footerText}>
              Вы просмотрели весь контент {year} года.
            </Text>
          </Card>
        );
      }
      if (loading) return <ActivityIndicator size={33} color='#e6e6fa' />;
      return null;
    };

    const renderItem = ({ item }: { item: Movie }) => {
      return (
        <MovieCard
          id={item.id!}
          year={item.year!}
          title={item.name!}
          poster={item.poster!}
        />
      );
    };

    useEffect(() => {
      return () => {
        dispatch(Actions.headerShow());
      };
    }, [dispatch]);

    const handleScroll = useCallback(
      (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        if (offsetY > THEMES.HEADER_SIZE / 3) {
          dispatch(Actions.headerHide());
        } else {
          dispatch(Actions.headerShow());
        }
      },
      [dispatch],
    );

    const toUpp = () => {
      requestAnimationFrame(() => {
        if (flatRef.current) {
          flatRef.current.scrollToOffset({
            animated: true,
            offset: 1,
          });
        }
      });
    };

    if (dataMovie.length === 0) {
      return <ActivityIndicator size='large' color='white' />;
    }

    const onReloadScreen = () => {
      setRefreshing(true);
      refresh();
      setRefreshing(false);
    };

    const getItemLayout = (idata: any, index: any) => ({
      length: 380,
      offset: 380 * index,
      index,
    });

    return (
      <>
        <FlatList
          ref={flatRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.container}
          data={data}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          onRefresh={onReloadScreen}
          refreshing={refreshing}
          numColumns={1}
          onEndReached={loadMore}
          ListFooterComponent={footer}
          //
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          onEndReachedThreshold={4}
          // columnWrapperStyle={styles.colStyle}
        />
        {!isHide && (
          <Icon
            containerStyle={styles.iconContainer}
            raised
            name='arrow-up'
            type='font-awesome'
            color='#f50'
            onPress={toUpp}
          />
        )}
      </>
    );
  },
);

export default InfiniteList;
