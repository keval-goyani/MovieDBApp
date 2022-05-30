import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Credentials,
  NavigationScreenType,
  navigationStrings,
  strings,
} from '../../constants';
import authAction from '../../redux/AuthRedux';
import { Icons, Metrics, styles as appStyles } from '../../theme';
import { Form } from './components';
import { styles } from './styles/SignUpScreenStyles';

const SignUpScreen = () => {
  const [registerCredentials, setRegisterCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigation: NavigationScreenType = useNavigation();
  const { email, password } = registerCredentials;
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  const signUpHandler = useCallback(() => {
    if (email !== '' && password !== '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential =>
          dispatch(authAction.authRequest(userCredential.user)),
        )
        .catch(() => {
          return (
            dispatch(authAction.authFailure(strings.signUpError)),
            navigation.navigate(navigationStrings.Login)
          );
        });
    }
  }, [dispatch, email, navigation, password]);

  useEffect(() => {
    signUpHandler();
  }, [signUpHandler]);

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
