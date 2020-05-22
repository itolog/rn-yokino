import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import styles from './styles';

const Mail = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hendleSendMail = () => {
    if (message) {
      setModalVisible(false);
    }
    setMessage('');
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
            <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
              <Icon name='close' size={24} color='red' />
            </TouchableOpacity>
            {/**/}
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
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Icon name='envelope' size={40} color='#F194FF' />
      </TouchableOpacity>
    </View>
  );
};

export default Mail;
