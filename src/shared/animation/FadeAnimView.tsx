import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/createStore';

import { COLORS } from '../constants/colors';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const FadeAnimView: React.FC<Props> = React.memo(({ children }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const isHide = useSelector(
    (state: AppState) => state.animState.isHeaderVisible,
  );

  const DURATION = 300;

  useEffect(() => {
    if (isHide) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: DURATION,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, isHide]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        opacity: fadeAnim,
        backgroundColor: COLORS.MAIN_TRANSPARENT,
        height: Dimensions.get('window').height,
        transform: [
          {
            scale: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
});

export default FadeAnimView;
