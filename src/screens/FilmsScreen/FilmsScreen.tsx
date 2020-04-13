import React from 'react';

import { MOVIES } from './ggl';
import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const FilmsScreen = () => {
  return <WithPagination ggl={MOVIES} type={MediaTypes.MOVIES} />;
};

export default FilmsScreen;
