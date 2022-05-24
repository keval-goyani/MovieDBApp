import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Icons } from '../../assets';
import {
  Credentials,
  NavigationScreenType,
  navigationStrings,
  strings,
} from '../../constants';
import authAction from '../../redux/AuthRedux';
import { Metrics, styles as appStyles } from '../../theme';
import { Form } from './components';
import { styles } from './styles/LoginScreenStyles';

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const { email, password } = loginCredentials;
  const dispatch = useDispatch();
  const navigation: NavigationScreenType = useNavigation();
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  const loginHandler = useCallback(() => {
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential =>
          dispatch(authAction.authRequest(userCredential.user)),
        )
        .catch(() => dispatch(authAction.authFailure(strings.loginError)));
    }
  }, [dispatch, email, password]);

  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={{ ...appStyles.container, ...styles.container }}
      onTouchStart={() => Keyboard.dismiss()}>
      <Image source={Icons.movieDbIcon3x} style={styles.image} />
      <Form getCredentials={setLoginCredentials} type={strings.loginCamel} />
      <Text style={styles.headerText}>{strings.accountNotExist}</Text>
      <TouchableOpacity
        style={styles.linkTextView}
        onPress={() => {
          navigation.navigate(navigationStrings.SignUp);
        }}>
        <Text style={styles.linkText}>{strings.createAccount}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
