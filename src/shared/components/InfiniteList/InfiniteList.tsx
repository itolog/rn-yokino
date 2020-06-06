import React, { useState, useLayoutEffect, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputScrollEventData,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';

import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../generated/graphql';
import { THEMES } from '../../constants/themes';
import EmptyData from '../../UI/EmptyData/EmptyData';

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
    // paddingTop: THEMES.HEADER_SIZE,
  },
  colStyle: {
    justifyContent: 'center',
  },
  footerText: {
    marginBottom: 10,
    padding: 15,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 25,
    right: 10,
    zIndex: 5,
  },
});

const InfiniteList: React.FC<Props> = React.memo(
  ({ data, loading, refresh, loadMore, nextPageUrl }) => {
    const flatRef = useRef<FlatList<any>>(null);
    const [dataMovie, setDataMovie] = useState(data);
    const [isArrowUppVisible, setIsArrowUppVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    // Delay for loading.Fix empty LIst Data.
    const [isLoaded, setIsLoaded] = useState(false);

    useLayoutEffect(() => {
      setDataMovie(data);
      setIsLoaded(true);
    }, [data, dataMovie]);

    const footer = () => {
      if (nextPageUrl === null && dataMovie.length !== 0) {
        return (
          <Card title='Конец списка'>
            <Text style={styles.footerText}>Вы просмотрели весь контент.</Text>
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
          kp={item.kinopoisk!}
          imdb={item.imdb!}
          quality={item.quality!}
        />
      );
    };

    useLayoutEffect(() => {
      return () => {
        setIsArrowUppVisible(false);
      };
    }, [setIsArrowUppVisible]);

    const handleScroll = useCallback(
      (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        if (offsetY > THEMES.HEADER_SIZE / 3) {
          setIsArrowUppVisible(true);
        } else {
          setIsArrowUppVisible(false);
        }
      },
      [setIsArrowUppVisible],
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

    if (!isLoaded) return <ActivityIndicator size='large' color='#0000ff' />;

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
          ListEmptyComponent={EmptyData}
          //
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          onEndReachedThreshold={4}
          // columnWrapperStyle={styles.colStyle}
        />
        {isArrowUppVisible && (
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
