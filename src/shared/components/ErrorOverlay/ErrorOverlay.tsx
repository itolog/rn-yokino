import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Text, View, StyleSheet } from 'react-native';
import { Overlay, Icon, Button } from 'react-native-elements';

import { Actions } from '../../../store/favorites-movies/actions';
import { Actions as ActionsSettings } from '../../../store/settings/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
  },
  errorText: {
    color: '#fffafa',
    backgroundColor: '#b22222',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sendBtn: {
    justifyContent: 'space-around',
    backgroundColor: '#8b0000',
  },
  backDrop: {
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  overLay: {
    backgroundColor: '#808080',
  },
});

interface IProps {
  message: string;
  visible: boolean;
  locationError: string;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearError: () => dispatch(Actions.clearErrorState()),
  clearSettingsError: () => dispatch(ActionsSettings.clearSettingsError()),
});

type Props = ReturnType<typeof mapDispatchToProps> & IProps;

const ErrorOverlay: React.FC<Props> = ({
  message,
  visible,
  clearError,
  clearSettingsError,
  locationError,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleText, setTitleText] = useState('Произошла ошибка!!!');
  const [isSendDone, setIsSendDone] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const closeOverlay = useCallback(() => {
    setIsVisible(false);
    clearError();
    clearSettingsError();
  }, [clearError, clearSettingsError]);

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
};

export default connect(null, mapDispatchToProps)(ErrorOverlay);
