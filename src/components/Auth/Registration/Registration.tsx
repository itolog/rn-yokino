import React from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import SignupSchema from './validation';
import styles from '../styles';
import { Values } from './types';

const Registration = () => {
  const hendleRegistration = (values: Values) => {
    console.log(values);
    Keyboard.dismiss();
  };

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={hendleRegistration}>
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Text style={styles.loginTitle}>Регистрация</Text>
          {/* NAME */}
          <Input
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            placeholder='имя'
            inputStyle={styles.messageInput}
            placeholderTextColor='#faebd7'
            value={values.name}
            errorMessage={errors.name && touched.name ? errors.name : ''}
            leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          />
          {/* EMAIl */}
          <Input
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder='email'
            inputStyle={styles.messageInput}
            placeholderTextColor='#faebd7'
            value={values.email}
            keyboardType='email-address'
            errorMessage={errors.email && touched.email ? errors.email : ''}
            leftIcon={{ type: 'font-awesome', name: 'at', color: 'white' }}
          />
          {/*  PASSWORD  */}
          <Input
            onChangeText={handleChange('password')}
            onBlur={handleBlur('name')}
            placeholder='пароль'
            inputStyle={styles.messageInput}
            placeholderTextColor='#faebd7'
            value={values.password}
            secureTextEntry={true}
            errorMessage={
              errors.password && touched.password ? errors.password : ''
            }
            leftIcon={{ type: 'font-awesome', name: 'key', color: 'white' }}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Icon name='send' size={40} color='#fff' />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default Registration;
