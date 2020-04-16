import React from 'react';

import { CARTOON_SERIALS } from './gql';
import WithPagination from '../../shared/components/WithPagination/WithPagination';
import { MediaTypes } from '../../shared/types/mediaTypes';

const CartoonSerialsScreen = () => {
  return (
    <WithPagination ggl={CARTOON_SERIALS} type={MediaTypes.CARTOON_SERIALS} />
  );
};

export default CartoonSerialsScreen;
