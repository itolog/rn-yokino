import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  name: string;
  onPress: (props: any) => void;
  color: string;
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
    marginLeft: 15,
  },
});

const AppHeaderIcon: React.FC<Props> = props => {
  const { name, color } = props;
  return (
    <TouchableOpacity {...props}>
      <Icon
        name={name}
        color={color}
        iconStyle={styles.icon}
        size={36}
        type='ionicon'
      />
    </TouchableOpacity>
  );
};

export default AppHeaderIcon;
