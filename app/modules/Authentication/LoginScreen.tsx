import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  defaultValues,
  FormDataType,
  NavigationScreenType,
  navigationStrings,
  strings,
} from '../../constants';
import authAction, { authDataSelectors } from '../../redux/AuthRedux';
import { loginError } from '../../services';
import { Color, Metrics, styles as appStyles } from '../../theme';
import { Form } from './components';
import { styles } from './styles/LoginScreenStyles';

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const form = useForm<FormDataType>({
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigation: NavigationScreenType = useNavigation();
  const { loading } = useSelector(authDataSelectors.getData);
  const { email, password } = loginCredentials;
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  const loginHandler = useCallback(async () => {
    if (email && password) {
      dispatch(authAction.authRequest());

      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const { uid } = userCredential?.user;
          dispatch(authAction.loginRequest(uid));
        })
        .catch(error => {
          const errorMessage = loginError(error.code);
          dispatch(authAction.authFailure(errorMessage));
          form.resetField('password');
        });
    }
  }, [dispatch, email, form, password]);

  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={appStyles.container}
      onTouchStart={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{ ...appStyles.container, ...styles.container }}>
        <Image source={Icons.movieDbIcon3x} style={styles.image} />
        <Form
          getCredentials={setLoginCredentials}
          type={strings.loginCamel}
          {...{ form }}
        />
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
