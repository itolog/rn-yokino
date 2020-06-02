import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Values } from './types';
import SignupSchema from './validation';

import styles from '../styles';

const LogIn = memo(() => {
  const navigation = useNavigation();

  const hendleLogin = (values: Values) => {
    console.log(values);
    navigation.navigate('Films');
  };

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{ name: '', password: '' }}
      onSubmit={hendleLogin}>
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => (
        <View style={styles.container}>
          <Text style={styles.loginTitle}>Войти</Text>
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
        </View>
      )}
    </Formik>
  );
});

export default LogIn;
