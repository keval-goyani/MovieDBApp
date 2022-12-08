import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { navigationStrings, strings } from '../constants';

import {
  ChatMessageScreen,
  ChatScreen,
  DetailScreen,
  HomeScreen,
  LocationScreen,
  LoginScreen,
  NewGroupScreen,
  ProfileInfoScreen,
  SignUpScreen,
} from '../modules';
import statusAction from '../redux/ChatUserListRedux';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const currentState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const authenticated = true;

  useEffect(() => {
    if (currentState.current === strings.activeState) {
      authenticated &&
        dispatch(statusAction.userListStatus(currentState.current));
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      authenticated && dispatch(statusAction.userListStatus(nextAppState));
    });

    return () => {
      subscription.remove();
    };
  }, [authenticated, dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authenticated ? (
            <Stack.Screen
              name={navigationStrings.HomeDrawer}
              component={HomeScreen}
            />
          ) : (
            <>
              <Stack.Screen
                name={navigationStrings.Login}
                component={LoginScreen}
              />
              <Stack.Screen
                name={navigationStrings.SignUp}
                component={SignUpScreen}
              />
            </>
          )}
          <Stack.Screen
            name={navigationStrings.Details}
            component={DetailScreen}
          />
          <>
            <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
              <Stack.Screen
                name={navigationStrings.ChatMessage}
                component={ChatMessageScreen}
              />
            </Stack.Group>
            <Stack.Screen
              name={navigationStrings.NewGroup}
              component={NewGroupScreen}
            />
          </>
          <>
            <Stack.Screen
              name={navigationStrings.Chat}
              component={ChatScreen}
            />
            <Stack.Screen
              name={navigationStrings.Location}
              component={LocationScreen}
            />
            <Stack.Screen
              options={{ animation: 'slide_from_bottom' }}
              name={navigationStrings.ProfileInfo}
              component={ProfileInfoScreen}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
