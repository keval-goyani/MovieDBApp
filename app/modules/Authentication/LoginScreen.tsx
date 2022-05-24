import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icons } from '../../assets';
import { strings } from '../../constants';
import { Metrics, styles as appStyles } from '../../theme';
import { Form } from './components';
import { styles } from './styles/LoginScreenStyles';

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState({});
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={{ ...appStyles.container, ...styles.container }}
      onTouchStart={() => Keyboard.dismiss()}>
      <Image source={Icons.movieDbIcon3x} style={styles.image} />
      <Form getCredentials={setLoginCredentials} type={strings.loginCamel} />
      <Text style={styles.headerText}>{strings.accountNotExist}</Text>
      <TouchableOpacity style={styles.linkTextView}>
        <Text style={styles.linkText}>{strings.createAccount}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
