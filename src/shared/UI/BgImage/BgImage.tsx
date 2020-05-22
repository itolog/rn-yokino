import React from 'react';
import { connect } from 'react-redux';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

// STORE
import { AppState } from '../../../store/createStore';
import { getImagePath } from '../../../store/settings/selectors';

const styles = StyleSheet.create({
  bgImg: {
    height: Dimensions.get('window').height,
  },
  image: {
    resizeMode: 'cover',
  },
});

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

const mapStateToProps = (state: AppState) => ({
  image: getImagePath(state),
});

type Props = ReturnType<typeof mapStateToProps> & IProps;

const BgImage: React.FC<Props> = React.memo(({ children, image }) => {
  return (
    <ImageBackground
      source={{ uri: image }}
      imageStyle={styles.image}
      style={styles.bgImg}>
      {children}
    </ImageBackground>
  );
});

export default connect(mapStateToProps)(BgImage);
