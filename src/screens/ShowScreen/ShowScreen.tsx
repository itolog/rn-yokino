import React from 'react';

import { SHOW } from './gql';

import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const ShowScreen = () => {
  return <WithPagination ggl={SHOW} type={MediaTypes.SHOW} />;
};

export default ShowScreen;
