import React, { useState, memo, useEffect } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import AuthButton from '../components/AuthButton/AuthButton';
import SignupSchema from './validation';
import styles from '../styles';
import { Values } from './types';
import { REEGISTRATION } from './gql';
import { UserLoginDto } from '../../../shared/generated/graphql';

// STORE
// STORE
import { Actions } from '../../../store/user/actions';
import { LOGIN } from '../LogIn/gql';

interface Props {
  setError: (error: string) => void;
}

const Registration: React.FC<Props> = memo(({ setError }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [passWord, setPassWord] = useState<string>();
  const [nameUser, setNameUser] = useState<string>();

  // Login after registration
  const loginCompleate = async ({ login }: { login: UserLoginDto }) => {
    dispatch(Actions.setUser(login));
    await navigation.navigate('Films');
  };
  const [getLoginState] = useLazyQuery(LOGIN, {
    onCompleted: loginCompleate,
  });
  // registration
  const registrationCompleate = () => {
    getLoginState({
      variables: {
        pass: passWord,
        name: nameUser,
      },
    });
  };
  const [addUser, { loading, error }] = useMutation(REEGISTRATION, {
    onCompleted: registrationCompleate,
  });

  // LOG ERROR TO HEADER
  useEffect(() => {
    if (error) {
      error.graphQLErrors.map(({ message }: any) => {
        const errMsg = message.detail.split('=')[1];
        setError(errMsg);
      });
    }
  }, [error, setError]);

  const hendleRegistration = async (values: Values) => {
    setNameUser(values.name.trim());
    setPassWord(values.password.trim());
    await addUser({
      variables: {
        input: {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
        },
      },
    });
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
        <View style={styles.container}>
          <Text style={styles.loginTitle}>Регистрация</Text>
          <KeyboardAvoidingView
            contentContainerStyle={styles.keyboarAvoid}
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
            {/* NAME */}
            <Input
              autoCapitalize='none'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder='имя'
              inputStyle={styles.messageInput}
              placeholderTextColor='#faebd7'
              value={values.name}
              errorMessage={errors.name && touched.name ? errors.name : ''}
              leftIcon={{
                type: 'font-awesome',
                name: 'user',
                color: 'white',
              }}
            />
            {/* EMAIl */}
            <Input
              autoCapitalize='none'
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
              autoCapitalize='none'
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
          </KeyboardAvoidingView>
          <AuthButton loading={loading} onSubmit={handleSubmit} />
        </View>
      )}
    </Formik>
  );
});

export default Registration;
