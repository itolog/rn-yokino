import React, { useState, memo } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, View } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { SEND_MAIL } from './gql';

// store
import { Actions } from '../../store/mail/actions';

import styles from './styles';

const Mail = memo(() => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const [sendMail, { loading }] = useMutation(SEND_MAIL);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hendleSendMail = () => {
    if (message && email && username) {
      sendMail({
        variables: {
          input: {
            from: email.trim(),
            name: username.trim(),
            text: message.trim(),
          },
        },
      })
        .then(() => {
          dispatch(Actions.sendMail());

          setMessage('');
          setEmail('');
          setUsername('');

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
            <View style={styles.form}>
              {/* =============   USERNAME  ======================== */}
              <Input
                placeholder='имя'
                // style={styles.messageInput}
                value={username}
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={setUsername}
              />
              {/* ======================== EMAIL  ====== */}
              <Input
                placeholder='email'
                keyboardType='email-address'
                value={email}
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={setEmail}
              />
              {/* =================== MESSAGE  ================= */}
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
