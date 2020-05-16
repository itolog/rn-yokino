import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
  setPreferences: () => void;
}

const ActionHeader: React.FC<Props> = ({ setPreferences }) => {
  const navigation = useNavigation();

  const togglePreferences = () => {
    requestAnimationFrame(() => {
      setPreferences();
    });
  };

  const navigateToFavorite = () => {
    requestAnimationFrame(() => {
      navigation.navigate('Favorites');
    });
  };
  const navigateToSettings = () => {
    requestAnimationFrame(() => {
      navigation.navigate('Settings');
    });
  };

  return (
    <View style={styles.headerBtns}>
      <Button
        buttonStyle={styles.buttonsGroup}
        icon={<Icon name='tune' color='#fff' size={30} />}
        onPress={togglePreferences}
      />
      <Button
        buttonStyle={styles.buttonsGroup}
        icon={
          <Icon name='heartbeat' type='font-awesome' color='#f50' size={30} />
        }
        onPress={navigateToFavorite}
      />
      <Button
        buttonStyle={styles.buttonsGroup}
        icon={
          <Icon name='cogs' type='font-awesome' color='#6734BA' size={30} />
        }
        onPress={navigateToSettings}
      />
    </View>
  );
};

export default ActionHeader;
