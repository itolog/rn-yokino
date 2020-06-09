import React, { memo } from 'react';
import { FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';
import { RouteProp, useRoute } from '@react-navigation/native';

import BgImage from '../../shared/UI/BgImage/BgImage';
import Loader from '../../shared/UI/Loader/Loader';
import MovieCard from '../../shared/components/MovieCard/MovieCard';
import ErrorBox from '../../shared/components/ErrorBox/ErrorBox';
import { SEARCH } from './gql';
import { Movie } from '../../shared/generated/graphql';

type RootStackParamList = {
  Search: { search: string };
};
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

const SearchScreen = memo(() => {
  const route = useRoute<SearchScreenRouteProp>();
  const { search } = route.params;

  const { loading, error, data } = useQuery(SEARCH, {
    variables: { title: search },
  });
  const movies: Movie[] = data && data.search.results;

  if (loading) return <Loader />;
  if (error) return <ErrorBox msg={error?.message} />;

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
  const emptyList = () => {
    return (
      <Card title='Список пуст'>
        <Text>По запросу `{search}` не найдено совпадений !</Text>
      </Card>
    );
  };

  const getItemLayout = (idata: any, index: any) => ({
    length: 380,
    offset: 380 * index,
    index,
  });

  return (
    <BgImage>
      <FlatList
        data={movies}
        getItemLayout={getItemLayout}
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
  );
});

export default SearchScreen;
