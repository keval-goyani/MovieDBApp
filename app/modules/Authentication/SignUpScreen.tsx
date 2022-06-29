import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHyperlink, Loader } from '../../components';
import {
  Credentials,
  NavigationDataType,
  navigationStrings,
  strings,
} from '../../constants';
import authAction, { authDataSelectors } from '../../redux/AuthRedux';
import { Color, Icons, Metrics, styles as appStyles } from '../../theme';
import { Form } from './components';
import { styles } from './styles/SignUpScreenStyles';

const SignUpScreen = () => {
  const [registerCredentials, setRegisterCredentials] = useState<Credentials>({
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigation: NavigationDataType = useNavigation();
  const { username, email, password } = registerCredentials;
  const behavior = Metrics.isAndroid ? 'height' : 'padding';
  const { loading } = useSelector(authDataSelectors.getData);

  const signUpHandler = useCallback(async () => {
    if (username && email && password) {
      const token = await messaging().getToken();
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userData =>
          dispatch(
            authAction.authRequest({
              user: userData.user,
              username,
              token,
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
        {loading && (
          <Loader color={Color.white} animating={true} size={'large'} />
        )}
        <CustomHyperlink
          {...{
            linkTitle: strings.alreadyAccount,
            hyperlinkTitle: strings.goToLogin,
            onPress: () => navigation.goBack(),
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
