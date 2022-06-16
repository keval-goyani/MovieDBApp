import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { navigationStrings } from '../constants';
import {
  ChatScreen,
  DetailScreen,
  LocationScreen,
  LoginScreen,
  SignUpScreen,
} from '../modules';
import { DrawerRoutes } from '../navigation';
import { authDataSelectors } from '../redux/AuthRedux';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { authenticated } = useSelector(authDataSelectors.getData);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authenticated ? (
            <Stack.Screen
              name={navigationStrings.HomeDrawer}
              component={DrawerRoutes}
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
            <Stack.Screen
              name={navigationStrings.Chat}
              component={ChatScreen}
            />
            <Stack.Screen
              name={navigationStrings.Location}
              component={LocationScreen}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
