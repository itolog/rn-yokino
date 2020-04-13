import React from 'react';
import { Button, View } from 'react-native';

interface Props {
  toNextPage: () => void;
  nextPageUrl: string | null;
}

const Pagination: React.FC<Props> = ({ toNextPage, nextPageUrl }) => {
  const nextPage = () => {
    toNextPage();
  };
  return (
    <View>{nextPageUrl && <Button title='nextpa' onPress={nextPage} />}</View>
  );
};

export default Pagination;
