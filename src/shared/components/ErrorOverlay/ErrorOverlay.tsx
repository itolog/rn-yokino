/**
 * TODO
 * 1) Implement Loger(Sentry or something else)
 */
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import { Overlay, Icon, Button } from 'react-native-elements';

import { Actions } from '../../../store/favorites-movies/actions';
import { Actions as ActionsSettings } from '../../../store/settings/actions';

import styles from './styles';

interface Props {
  message: string;
  visible: boolean;
  locationError: string;
}

const ErrorOverlay: React.FC<Props> = memo(
  ({ message, visible, locationError }) => {
    // STORE
    const dispatch = useDispatch();
    // loacal state
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleText, setTitleText] = useState('Произошла ошибка!!!');
    const [isSendDone, setIsSendDone] = useState(false);

    useEffect(() => {
      setIsVisible(visible);
    }, [visible]);

    const closeOverlay = useCallback(() => {
      setIsVisible(false);
      dispatch(Actions.clearErrorState());
      dispatch(ActionsSettings.clearSettingsError());
    }, [dispatch]);

    const sendIssue = useCallback(() => {
      setLoading(true);

      console.log('send issue: ', { message, locationError });
      setTimeout(() => {
        setLoading(false);
        setIsSendDone(true);
        setTitleText('Отчёт отправлен.');
      }, 2000);
    }, [message, locationError]);

    return (
      <Overlay
        backdropStyle={styles.backDrop}
        overlayStyle={styles.overLay}
        onBackdropPress={closeOverlay}
        isVisible={isVisible}>
        <View style={styles.container}>
          <Button title='закрыть' onPress={closeOverlay} />
          <Text style={styles.text}>{titleText}</Text>
          <Text style={styles.errorText}>{message}</Text>
          <Button
            icon={
              !isSendDone ? (
                <Icon name='send' size={18} color='white' />
              ) : (
                <Icon name='done-all' size={18} color='#90ee90' />
              )
            }
            iconRight
            disabled={isSendDone}
            disabledStyle={styles.sendBtn}
            title='отправить отчёт'
            loading={loading}
            buttonStyle={styles.sendBtn}
            onPress={sendIssue}
          />
        </View>
      </Overlay>
    );
  },
);

export default ErrorOverlay;
