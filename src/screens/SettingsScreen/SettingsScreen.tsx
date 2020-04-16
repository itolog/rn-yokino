import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import { SafeAreaView } from 'react-native-safe-area-context';

import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';

import ErrorOverlay from '../../shared/components/ErrorOverlay/ErrorOverlay';
import BgImage from '../../shared/UI/BgImage/BgImage';

// Store
import {
  getImagePath,
  getImagePathError,
} from '../../store/settings/selectors';
import { Actions as settingsActions } from '../../store/settings/actions';
import { AppState } from '../../store/createStore';

const mapStateToProps = (state: AppState) => {
  return {
    imagePath: getImagePath(state),
    imagePathError: getImagePathError(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveImage: (payload: string) => dispatch(settingsActions.setImgPath(payload)),
  resetImage: () => dispatch(settingsActions.resetImagePath()),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const SettingsScreen = ({
  saveImage,
  imagePathError,
  imagePath,
  resetImage,
}: Props) => {
  const [loacalImg, setLocalImg] = useState<string>(imagePath);

  useEffect(() => {
    setLocalImg(imagePath);
  }, [imagePath]);

  const saveImageHandler = () => {
    requestAnimationFrame(() => {
      saveImage(loacalImg);
    });
  };

  const resetImageHandler = () => {
    requestAnimationFrame(() => {
      resetImage();
    });
  };

  const pickImageHandler = () => {
    requestAnimationFrame(() => {
      ImagePicker.openPicker({
        writeTempFile: true,
        mediaType: 'photo',
      })
        .then((image: any) => {
          setLocalImg(image.path);
        })
        .catch(e => {
          Alert.alert('Ошибка загрузки', e.message, [{ text: 'закрыть' }], {
            cancelable: false,
          });
        });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BgImage>
        {/*  ErrorOverlay */}
        <ErrorOverlay
          visible={!!imagePathError}
          message={imagePathError!}
          locationError='экран SettingsScreen.tsx'
        />

        <Card
          titleStyle={styles.cardStyleTitle}
          containerStyle={styles.cardStyle}
          title='Сменить фон'>
          <ImageBackground source={{ uri: loacalImg }} style={styles.cardBtns}>
            <TouchableOpacity onPress={resetImageHandler}>
              <Icon name='delete-forever' reverse size={25} color='#c71585' />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImageHandler}>
              <Icon
                name='ios-image'
                reverse
                type='ionicon'
                size={25}
                color='#000080'
              />
            </TouchableOpacity>
          </ImageBackground>
          <Button
            onPress={saveImageHandler}
            buttonStyle={styles.btnSave}
            icon={<Icon name='save' color='white' />}
          />
        </Card>
      </BgImage>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
