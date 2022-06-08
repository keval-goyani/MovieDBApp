import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
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
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigation: NavigationScreenType = useNavigation();
  const { username, email, password } = registerCredentials;
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  const signUpHandler = useCallback(async () => {
    if (username && email && password) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userData =>
          dispatch(
            authAction.authRequest({
              user: userData.user,
              username,
            }),
          ),
        )
        .catch(() => {
          return (
            dispatch(authAction.authFailure(strings.signUpError)),
            navigation.navigate(navigationStrings.Login)
          );
        });
    }
  }, [dispatch, email, navigation, password, username]);

  useEffect(() => {
    signUpHandler();
  }, [signUpHandler]);

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={appStyles.container}
      onTouchStart={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{ ...appStyles.container, ...styles.container }}>
        <Image source={Icons.movieDbIcon3x} style={styles.image} />
        <Form
          getCredentials={setRegisterCredentials}
          type={strings.signUpCamel}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
