import React from 'react';

import { ANIME } from './gql';
import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const AnimeScreen = () => {
  return <WithPagination ggl={ANIME} type={MediaTypes.ANIME} />;
};

export default AnimeScreen;
