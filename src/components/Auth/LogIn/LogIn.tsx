import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useLazyQuery } from '@apollo/react-hooks';

import { LOGIN } from './gql';
import { Values } from './types';
import SignupSchema from './validation';
import AuthButton from '../components/AuthButton/AuthButton';

import styles from '../styles';
import { UserLoginDto } from '../../../shared/generated/graphql';

// STORE
import { Actions } from '../../../store/user/actions';

interface Props {
  setError: (error: string) => void;
}

const LogIn: React.FC<Props> = memo(({ setError }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginCompleate = ({ login }: { login: UserLoginDto }) => {
    navigation.navigate('Films');
    dispatch(Actions.setUser(login));
  };

  const [getLoginState, { loading, error }] = useLazyQuery(LOGIN, {
    onCompleted: loginCompleate,
  });

  // LOG ERROR TO HEADER
  useEffect(() => {
    if (error) {
      const errorMessage = error.message.split(':')[1];
      setError(errorMessage);
    }
  }, [error, setError]);

  const hendleLogin = (values: Values) => {
    getLoginState({
      variables: {
        pass: values.password,
        name: values.name,
      },
    });
    Keyboard.dismiss();
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
          <View style={styles.formHeader}>
            <Text style={styles.loginTitle}>Войти</Text>
            <View>
              {loading && <ActivityIndicator size='small' color='#0000ff' />}
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

export default LogIn;
