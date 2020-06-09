import React, { memo, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ProgressBarAndroid,
  Platform,
  ProgressViewIOS,
  InteractionManager,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes';
import { COLORS } from '../../shared/constants/colors';

interface Props {
  src: string;
}

const styles = StyleSheet.create({
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

const YokinoWebView: React.FC<Props> = memo(({ src }) => {
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

  const handleOnLoad = (event: WebViewProgressEvent) => {
    const { nativeEvent } = event;
    InteractionManager.runAfterInteractions(() => {
      setProgress(nativeEvent.progress);
    });
  };
  return (
    <View>
      <View style={styles.wrappProgress}>
        {progress && progress < 1 ? ProgressBar() : null}
      </View>
      <WebView
        ref={webview}
        style={styles.backgroundVideo}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        source={{
          html: src,
        }}
        onLoadProgress={handleOnLoad}
      />
    </View>
  );
});

export default YokinoWebView;
