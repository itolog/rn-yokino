import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/createStore';

import { THEMES } from '../constants/themes';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const HeaderAnimView: React.FC<Props> = React.memo(({ children }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [height] = useState(new Animated.Value(THEMES.HEADER_SIZE));
  const isHide = useSelector(
    (state: AppState) => state.animState.isHeaderVisible,
  );

  const DURATION = 500;

  useEffect(() => {
    if (isHide) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: DURATION,
          easing: Easing.bounce,
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: 150,
          duration: DURATION,
          easing: Easing.bounce,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [fadeAnim, isHide, height]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        opacity: fadeAnim,
        height,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-THEMES.HEADER_SIZE, 0],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
});

export default HeaderAnimView;
