import React from 'react';
import { useSelector } from 'react-redux';
import { ImageBackground, StyleSheet } from 'react-native';

// STORE
import { getImagePath } from '../../../store/settings/selectors';

const styles = StyleSheet.create({
  bgImg: {
    height: '100%',
  },
  image: {
    resizeMode: 'cover',
  },
});

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BgImage: React.FC<Props> = React.memo(({ children }) => {
  const image = useSelector(getImagePath);
  return (
    <ImageBackground
      source={{ uri: image }}
      imageStyle={styles.image}
      style={styles.bgImg}>
      {children}
    </ImageBackground>
  );
});

export default BgImage;
