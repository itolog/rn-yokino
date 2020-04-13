import React from 'react';
import { Icon } from 'react-native-elements';

interface Props {
  onPress: () => void;
  name: string;
  raised?: any;
  color: string;
}

const AppHeaderIcon: React.FC<Props> = props => {
  return <Icon {...props} type='ionicon' />;
};

export default AppHeaderIcon;
