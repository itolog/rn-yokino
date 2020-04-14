import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar, Card, Icon } from 'react-native-elements';

import uniqBy from 'lodash.uniqby';

import { SafeAreaView } from 'react-native-safe-area-context';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useQuery } from '@apollo/react-hooks';

import { DocumentNode } from 'graphql';
import Loader from '../Loader/Loader';
import InfiniteList from '../InfiniteList/InfiniteList';
import ErrorBox from '../ErrorBox/ErrorBox';
import { MediaTypes } from '../../types/mediaTypes';

import { Movie, Movies } from '../../generated/graphql';
import YearPicker from '../../../components/YearPicker/YearPicker';
import { COLORS } from '../../constants/colors';
import BgImage from '../BgImage/BgImage';
import HeaderAnimView from '../../animation/HeaderAnimView';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.MAIN_COLOR,
  },
  bgImg: {
    width: '100%',
    height: '100%',
  },
  noConnect: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  noConnectText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

interface Props {
  ggl: DocumentNode;
  type: MediaTypes;
}

const WithPagination: React.FC<Props> = React.memo(({ ggl, type }) => {
  const navigation = useNavigation();
  // LOCAL STATE
  const initialYear = new Date().getFullYear();
  const [nextPage, setNextPage] = useState(1);
  const [movieYear, setMovieYear] = useState(initialYear);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [netInfoState, setNetInfo] = useState<NetInfoState>();

  const { loading, error, data, refetch, fetchMore } = useQuery(ggl, {
    variables: {
      page: nextPage,
      year: movieYear,
      genre_id: 0,
    },
  });

  let mediaData: Movies = data?.movies;
  if (type === MediaTypes.MOVIES) {
    mediaData = data?.movies;
  } else if (type === MediaTypes.SERIALS) {
    mediaData = data?.serials;
  }

  const FetchNetStat = useCallback(() => {
    NetInfo.fetch().then(state => {
      setNetInfo(state);
    });
  }, []);

  // GET NETWORK STATUS
  useEffect(() => {
    FetchNetStat();
  }, [FetchNetStat]);

  // SET FETCH DATA TO MOVIE LIST
  // In Deps must be ONLY mediaData!!!!
  useEffect(() => {
    if (mediaData?.results) {
      if (nextPage === 1) {
        setMovieList(mediaData?.results);
      } else {
        const movies = [...movieList, ...mediaData?.results];
        // GET UNIQ movie form API ,some times DATA contain non uniq items
        const newMovieData = uniqBy(movies, 'id');
        setMovieList(newMovieData);
      }
    }
  }, [mediaData]);

  if (netInfoState && !netInfoState.isInternetReachable) {
    return (
      <Card
        containerStyle={styles.noConnect}
        title={<Icon name='wifi' color='red' />}>
        <Text style={styles.noConnectText}>
          Отсутствует подключение к интернету
        </Text>
      </Card>
    );
  }

  if (error) return <ErrorBox msg={error.message} />;

  if (loading && nextPage === 1) return <Loader />;

  const toNextPage = async () => {
    const next = nextPage + 1;
    if (mediaData?.next_page) {
      await setNextPage(next);
      await fetchMore({
        variables: {
          page: next,
        },
        updateQuery: (prev, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          mediaData = fetchMoreResult.data;

          return fetchMoreResult;
        },
      });
      //
    }
  };

  const setYear = (item: number) => {
    setMovieYear(item);
    setNextPage(1);
  };

  const refreshMovieList = async () => {
    setNextPage(1);
    await refetch().then(res => {
      mediaData = res.data;
    });
  };

  const updateSearch = async (searchText: string) => {
    setSearch(searchText);
  };

  const onSubmit = () => {
    if (search.length > 0) {
      navigation.navigate('Search', { search });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BgImage>
        <HeaderAnimView>
          <SearchBar
            placeholder='поиск ...'
            onChangeText={updateSearch}
            value={search}
            round={true}
            onSubmitEditing={onSubmit}
          />
          <YearPicker movieYear={movieYear} setMovieYear={setYear} />
        </HeaderAnimView>

        <InfiniteList
          refresh={refreshMovieList}
          loading={loading}
          year={movieYear}
          nextPageUrl={mediaData?.next_page!}
          data={movieList}
          loadMore={toNextPage}
        />
      </BgImage>
    </SafeAreaView>
  );
});

export default WithPagination;
