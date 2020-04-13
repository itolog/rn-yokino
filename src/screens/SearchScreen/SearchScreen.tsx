import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Badge, ButtonGroup, Card } from 'react-native-elements';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useQuery } from '@apollo/react-hooks';

import { RouteProp } from '@react-navigation/native';

import styles from './styles';
import BgImage from '../../shared/components/BgImage/BgImage';
import Loader from '../../shared/components/Loader/Loader';
import MovieCard from '../../shared/components/MovieCard/MovieCard';
import ErrorBox from '../../shared/components/ErrorBox/ErrorBox';
import { SEARCH_MOVIES } from './ggl';

type RootStackParamList = {
  Search: { search: string };
};
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

interface Props {
  route: SearchScreenRouteProp;
}

const SearchScreen: React.FC<Props> = ({ route }) => {
  const search = route.params?.search;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { loading, error, data } = useQuery(SEARCH_MOVIES, {
    variables: { title: search },
  });
  const movies = data && data.searchMedia;

  if (loading) return <Loader />;
  if (error) return <ErrorBox msg={error?.message} />;

  const button1 = () => (
    <View>
      <Text>Фильмы</Text>
      <Badge
        status={!movies.movies.length ? 'error' : 'success'}
        value={movies.movies.length}
        badgeStyle={styles.badgeStyle}
        containerStyle={styles.badgeStyleContainer}
      />
    </View>
  );
  const button2 = () => (
    <View>
      <Text>Сериалы</Text>
      <Badge
        status={!movies.serials.length ? 'error' : 'success'}
        value={movies.serials.length}
        badgeStyle={styles.badgeStyle}
        containerStyle={styles.badgeStyleContainer}
      />
    </View>
  );

  const renderItem = ({ item }: any) => {
    return (
      <MovieCard
        kinopoisk_id={item.kinopoisk_id}
        year={item.year || item.start_date}
        title={item.ru_title}
        last_episode={item.episode_count}
        last_season={item.season_count}
        poster={item.poster}
      />
    );
  };
  const emptyList = () => {
    return (
      <Card title='Список пуст'>
        <Text>По запросу {search} не найдено совпадений !</Text>
      </Card>
    );
  };

  const getItemLayout = (idata: any, index: any) => ({
    length: 380,
    offset: 380 * index,
    index,
  });

  const updateIndex = (index: number) => {
    requestAnimationFrame(() => {
      setSelectedIndex(index);
    });
  };

  const buttons = [{ element: button1 }, { element: button2 }];
  return (
    <SafeAreaView style={styles.container}>
      <BgImage>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.btnsGroup}
        />
        {selectedIndex === 0 ? (
          <FlatList
            data={movies.movies}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.kinopoisk_id}
            numColumns={1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={8}
            updateCellsBatchingPeriod={40}
            initialNumToRender={6}
            windowSize={11}
            ListEmptyComponent={emptyList}
          />
        ) : (
          <FlatList
            data={movies.serials}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.kinopoisk_id}
            numColumns={1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={8}
            updateCellsBatchingPeriod={40}
            initialNumToRender={6}
            windowSize={11}
            ListEmptyComponent={emptyList}
          />
        )}
      </BgImage>
    </SafeAreaView>
  );
};

export default SearchScreen;
