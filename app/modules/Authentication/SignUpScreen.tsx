import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView } from 'react-native';
import { strings } from '../../constants';
import { Icons, Metrics, styles as appStyles } from '../../theme';
import { Form } from './components';
import { styles } from './styles/SignUpScreenStyles';

const SignUpScreen = () => {
  const [registerCredentials, setRegisterCredentials] = useState({});
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={{ ...appStyles.container, ...styles.container }}
      onTouchStart={() => Keyboard.dismiss()}>
      <Image source={Icons.movieDbIcon3x} style={styles.image} />
      <Form
        getCredentials={setRegisterCredentials}
        type={strings.signUpCamel}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
