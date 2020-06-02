import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
// @ts-ignore
import TextTicker from 'react-native-text-ticker';
import { COLORS } from '../../../shared/constants/colors';

interface Props {
  backHandler: () => void;
  title: string;
}

const titleStyle = {
  color: 'white',
  fontSize: 18,
};

const styles = StyleSheet.create({
  container: {
    // height: THEMES.HEADER_SIZE,
    backgroundColor: COLORS.MAIN_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 60,
    backgroundColor: COLORS.MENU_COLOR,
  },
  titleContainer: {
    marginLeft: 5,
  },
  title: {
    ...titleStyle,
  },
  titleTicker: {
    ...titleStyle,
    height: '100%',
    paddingTop: 10,
  },
});

const MovieDetailsHeader: React.FC<Props> = ({ backHandler, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftIcon} onPress={backHandler}>
        <Icon
          color={COLORS.MAIN_TRANSPARENT}
          size={60}
          name='ios-arrow-back'
          type='ionicon'
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        {title.length > 20 ? (
          <TextTicker
            style={styles.titleTicker}
            duration={8000}
            bounce={false}
            shouldAnimateTreshold={40}
            isRTL={false}
            repeatSpacer={20}
            marqueeDelay={4000}>
            {title}
          </TextTicker>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
    </View>
  );
};

export default MovieDetailsHeader;
