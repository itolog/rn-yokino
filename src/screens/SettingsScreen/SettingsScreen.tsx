import React, { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Alert,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';

import ErrorOverlay from '../../shared/components/ErrorOverlay/ErrorOverlay';
import BgImage from '../../shared/UI/BgImage/BgImage';
import Mail from '../../components/Mail/Mail';

// Store
import {
  getImagePath,
  getImagePathError,
} from '../../store/settings/selectors';
import { Actions as settingsActions } from '../../store/settings/actions';

const SettingsScreen = memo(() => {
  // STORE
  const imagePath = useSelector(getImagePath);
  const imagePathError = useSelector(getImagePathError);

  const dispatch = useDispatch();
  // local state
  const [loacalImg, setLocalImg] = useState<string>(imagePath);

  useEffect(() => {
    setLocalImg(imagePath);
  }, [imagePath]);

  const saveImageHandler = () => {
    requestAnimationFrame(() => {
      dispatch(settingsActions.setImgPath(loacalImg));
    });
  };

  const resetImageHandler = () => {
    requestAnimationFrame(() => {
      dispatch(settingsActions.resetImagePath());
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
    <ScrollView contentContainerStyle={styles.container}>
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
        {/* MAIL SEND  */}
        <Mail />
      </BgImage>
    </ScrollView>
  );
});

export default SettingsScreen;
