import React from 'react';

interface Props {
  children: JSX.Element[] | JSX.Element;
  val: any;
}

const IsEmpty: React.FC<Props> = React.memo(({ children, val }) => {
  if (
    val !== null &&
    val !== '' &&
    val !== 0 &&
    val !== '0' &&
    val[0] !== '' &&
    val?.length !== 0
  ) {
    return <>{children}</>;
  }
  return null;
});

export default IsEmpty;
