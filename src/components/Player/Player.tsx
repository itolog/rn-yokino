import React, { useState, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

import YokinoWebView from './YokinoWebView';
import { COLORS } from '../../shared/constants/colors';
import html from './html';

interface Props {
  src?: string | null;
  id?: string | null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.MAIN_COLOR,
  },
});

const Player: React.FC<Props> = memo(({ src = '', id }) => {
  const [playerChecked, togglePlayer] = useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        title='сменить плеер'
        checked={playerChecked}
        onPress={() => togglePlayer(!playerChecked)}
      />

      {!playerChecked ? (
        <YokinoWebView
          src={html(`https://yokino-api.herokuapp.com/player?src=${src}`)}
        />
      ) : (
        <YokinoWebView
          src={html(`https://8954.videocdn.pw/wn5b6cebGMkf?kp_id=${id}`)}
        />
      )}
    </View>
  );
});

export default Player;
