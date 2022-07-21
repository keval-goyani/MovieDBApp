import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Credentials, FormTypeProps, strings } from '../../../constants';
import { Color } from '../../../theme';
import { styles } from './styles/FormStyles';

const Form = ({ getCredentials, type }: FormTypeProps) => {
  const buttonText =
    type === strings.loginCamel ? strings.login : strings.signUp;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: Credentials) => {
    const credentials = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    getCredentials(credentials);
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        {type === strings.signUpCamel && (
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={strings.username}
                placeholderTextColor={Color.darkGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
        )}
        {errors.username && (
          <Text style={styles.errorMessage}>{strings.usernameFormat}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: strings.emailRegex,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={strings.email}
              placeholderTextColor={Color.darkGray}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorMessage}>{strings.emailFormat}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: strings.passwordRegex,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={strings.password}
              placeholderTextColor={Color.darkGray}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorMessage}>{strings.passwordRegexMatch}</Text>
        )}
        {type === strings.signUpCamel && (
          <Controller
            control={control}
            rules={{
              required: true,
              validate: value => getValues('password') === value,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder={strings.confirmPasswordPlaceholder}
                placeholderTextColor={Color.darkGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="confirmPassword"
          />
        )}
        {errors.confirmPassword && (
          <Text style={styles.errorMessage}>{strings.confirmPassword}</Text>
        )}
        <LinearGradient
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 0 }}
          colors={[Color.dropDownGradientStart, Color.dropDownGradientEnd]}
          style={styles.linearGradient}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submit}
            activeOpacity={0.5}>
            <Text style={styles.submitText}>{buttonText}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Form;
