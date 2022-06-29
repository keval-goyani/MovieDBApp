import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../assets';
import { CustomHyperlink, Loader } from '../../components';
import {
  Credentials,
  NavigationScreenType,
  navigationStrings,
  strings,
} from '../../constants';
import authAction, { authDataSelectors } from '../../redux/AuthRedux';
import fcmTokenAction from '../../redux/FcmTokenRedux';
import { Color, Metrics, styles as appStyles } from '../../theme';
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
  const { loading } = useSelector(authDataSelectors.getData);

  const loginHandler = useCallback(async () => {
    if (email && password) {
      // await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential =>
          dispatch(
            authAction.loginRequest({ user: userCredential.user, token }),
          ),
        )
        .catch(() => dispatch(authAction.authFailure(strings.loginError)));
    }
  }, [dispatch, email, password]);

  // const onDisplayNotification = useCallback(async () => {
  //   await messaging().registerDeviceForRemoteMessages();
  //   const token = await messaging().getToken();
  //   dispatch(fcmTokenAction.fcmTokenSuccess(token));
  // }, [dispatch]);

  useEffect(() => {
    loginHandler();
    // onDisplayNotification();
  }, [loginHandler]);

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={appStyles.container}
      onTouchStart={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{ ...appStyles.container, ...styles.container }}>
        <Image source={Icons.movieDbIcon3x} style={styles.image} />
        <Form getCredentials={setLoginCredentials} type={strings.loginCamel} />
        {loading && (
          <Loader color={Color.white} animating={true} size={'large'} />
        )}
        <CustomHyperlink
          {...{
            linkTitle: strings.accountNotExist,
            hyperlinkTitle: strings.createAccount,
            onPress: () => navigation.navigate(navigationStrings.SignUp),
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
