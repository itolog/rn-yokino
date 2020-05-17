import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ProgressBarAndroid,
  Platform,
  ProgressViewIOS,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { CheckBox } from 'react-native-elements';
import { COLORS } from '../../shared/constants/colors';
import html from './html';

interface Props {
  src?: string | null;
  id?: string | null;
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    backgroundColor: COLORS.MAIN_COLOR,
  },
  backgroundVideo: {
    width: '100%',
    height: 390,
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: COLORS.MAIN_COLOR,
  },
  wrappProgress: {
    height: 10,
  },
});

const Player: React.FC<Props> = ({ src = '', id }) => {
  const [playerChecked, togglePlayer] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const webview = useRef<WebView>(null);

  const ProgressBar = () => {
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid
          styleAttr='Horizontal'
          indeterminate={false}
          color={COLORS.PROGRESS_COLOR}
          progress={progress}
        />
      );
    }
    return (
      <ProgressViewIOS
        progressTintColor={COLORS.PROGRESS_COLOR}
        progress={progress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CheckBox
        title='сменить плеер'
        checked={playerChecked}
        onPress={() => togglePlayer(!playerChecked)}
      />

      <View style={styles.wrappProgress}>
        {progress && progress < 1 ? ProgressBar() : null}
      </View>
      {!playerChecked ? (
        <WebView
          ref={webview}
          style={styles.backgroundVideo}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={{
            html: html(`https://yokino-api.herokuapp.com/player?src=${src}`),
          }}
          onLoadProgress={({ nativeEvent }) => {
            setProgress(nativeEvent.progress);
          }}
        />
      ) : (
        <WebView
          ref={webview}
          style={styles.backgroundVideo}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={{
            html: html(`https://8954.videocdn.pw/wn5b6cebGMkf?kp_id=${id}`),
          }}
          onLoadProgress={({ nativeEvent }) => {
            setProgress(nativeEvent.progress);
          }}
        />
      )}
    </View>
  );
};

export default Player;
