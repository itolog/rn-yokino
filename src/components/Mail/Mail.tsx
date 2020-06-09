import React, { useState, memo } from 'react';
import {
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { SEND_MAIL } from './gql';

// store
import { Actions } from '../../store/mail/actions';
import { getUser, isUserLogged } from '../../store/user/selectors';

import styles from './styles';

const Mail = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector(getUser);
  const isLogIn = useSelector(isUserLogged);

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [sendMail, { loading }] = useMutation(SEND_MAIL);

  const toggleModal = () => {
    requestAnimationFrame(() => {
      setModalVisible(!modalVisible);
    });
  };

  const toAuth = () => {
    requestAnimationFrame(() => {
      setModalVisible(false);
      navigation.navigate('Auth');
    });
  };

  const hendleSendMail = () => {
    if (message) {
      sendMail({
        variables: {
          input: {
            id: user?.id,
            from: user?.email,
            name: user?.name,
            text: message.trim(),
          },
        },
      })
        .then(() => {
          dispatch(Actions.sendMail());

          setMessage('');

          setModalVisible(false);
        })
        .catch(e => {
          dispatch(Actions.sendMailFailure(e.message));
        });
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.formHeader}>
              <View>
                {loading && <ActivityIndicator size='small' color='#00ff00' />}
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
                <Icon name='close' size={24} color='red' />
              </TouchableOpacity>
            </View>
            {/**/}
            {isLogIn ? (
              <View style={styles.form}>
                <Input
                  placeholder='сообщение'
                  // style={styles.messageInput}
                  value={message}
                  leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  onChangeText={setMessage}
                />

                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={hendleSendMail}>
                  <Icon name='send' size={40} color='#F194FF' />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.nonLoginTitle}>
                  Войдите в аккаунт, чтобы написать
                </Text>

                <Button
                  onPress={toAuth}
                  icon={<Icon name='sign-in' size={35} color='white' />}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Icon name='envelope' size={40} color='#F194FF' />
      </TouchableOpacity>
    </View>
  );
});

export default Mail;
