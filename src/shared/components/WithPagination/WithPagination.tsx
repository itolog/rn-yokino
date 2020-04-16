import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar, Card, Icon, Button } from 'react-native-elements';

import uniqBy from 'lodash.uniqby';

import { SafeAreaView } from 'react-native-safe-area-context';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useQuery } from '@apollo/react-hooks';

import { DocumentNode } from 'graphql';
import Loader from '../../UI/Loader/Loader';
import InfiniteList from '../InfiniteList/InfiniteList';
import ErrorBox from '../ErrorBox/ErrorBox';
import { MediaTypes } from '../../types/mediaTypes';

import { Movie, Movies } from '../../generated/graphql';
import YearPicker from '../../../components/YearPicker/YearPicker';
import GenrePicker from '../../../components/GenrePicker/GenrePicker';
import BgImage from '../../UI/BgImage/BgImage';
import HeaderAnimView from '../../animation/HeaderAnimView';

import styles from './styles';

interface Props {
  ggl: DocumentNode;
  type: MediaTypes;
}

const WithPagination: React.FC<Props> = React.memo(({ ggl, type }) => {
  const navigation = useNavigation();
  // LOCAL STATE

  const [nextPage, setNextPage] = useState(1);
  const [preferences, setPreferences] = useState(false);
  const [movieYear, setMovieYear] = useState(0);
  const [movieGenre, setMovieGenre] = useState(0);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [netInfoState, setNetInfo] = useState<NetInfoState>();

  const { loading, error, data, refetch, fetchMore } = useQuery(ggl, {
    variables: {
      page: nextPage,
      year: movieYear,
      genre_id: movieGenre,
    },
  });

  let mediaData: Movies = data?.movies;

  switch (type) {
    case MediaTypes.FILMS: {
      mediaData = data?.movies;
      break;
    }
    case MediaTypes.SERIALS: {
      mediaData = data?.serials;
      break;
    }
    case MediaTypes.SHOW: {
      mediaData = data?.show;
      break;
    }
    case MediaTypes.ANIME: {
      mediaData = data?.anime;
      break;
    }
    case MediaTypes.ANIME_SERIALS: {
      mediaData = data?.animeSerials;
      break;
    }
    case MediaTypes.CARTOON: {
      mediaData = data?.cartoon;
      break;
    }
    case MediaTypes.CARTOON_SERIALS: {
      mediaData = data?.cartoonSerials;
      break;
    }
    default: {
      mediaData = data?.movies;
    }
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
    setPreferences(false);
  };

  const setGenre = (item: number) => {
    setMovieGenre(item);
    setNextPage(1);
    setPreferences(false);
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

  const togglePreferences = () => {
    requestAnimationFrame(() => {
      setPreferences(!preferences);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BgImage>
        <View>
          <Button
            icon={<Icon name='tune' color='#fff' size={30} />}
            onPress={togglePreferences}
          />
          {preferences ? (
            <View>
              <HeaderAnimView>
                <SearchBar
                  containerStyle={styles.searchBar}
                  placeholder='поиск ...'
                  onChangeText={updateSearch}
                  value={search}
                  round={true}
                  onSubmitEditing={onSubmit}
                />
                <View style={styles.filter}>
                  <YearPicker movieYear={movieYear} setMovieYear={setYear} />
                  <GenrePicker
                    movieGenre={movieGenre}
                    setMovieGenre={setGenre}
                  />
                </View>
              </HeaderAnimView>
            </View>
          ) : null}
        </View>
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
