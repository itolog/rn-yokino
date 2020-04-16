import React from 'react';

import { CARTOON } from './gql';
import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const CartoonScreen = () => {
  return <WithPagination ggl={CARTOON} type={MediaTypes.CARTOON} />;
};

export default CartoonScreen;
