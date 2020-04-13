import React from 'react';

import { SERIALS } from './ggl';
import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const SerialsScreen = () => {
  return <WithPagination ggl={SERIALS} type={MediaTypes.SERIALS} />;
};

export default SerialsScreen;
