import React from 'react';

import { ANIME_SERIALS } from './gql';
import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const AnimeSerialsScreen = () => {
  return <WithPagination ggl={ANIME_SERIALS} type={MediaTypes.ANIME_SERIALS} />;
};

export default AnimeSerialsScreen;
