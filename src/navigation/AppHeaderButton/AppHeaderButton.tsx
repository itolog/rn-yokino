import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  icon: { marginRight: 15 },
});

const AppHeaderIcon: React.FC<Props> = props => {
  return (
    <TouchableOpacity {...props}>
      <Icon
        name='ios-menu'
        color={COLORS.MENU_COLOR}
        iconStyle={styles.icon}
        size={36}
        type='ionicon'
      />
    </TouchableOpacity>
  );
};

export default AppHeaderIcon;
