import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { navigationStrings } from '../constants';
import { DetailScreen, LoginScreen, SignUpScreen } from '../modules';
import { DrawerRoutes } from '../navigation';
import { authDataSelectors } from '../redux/AuthRedux';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { authenticated } = useSelector(authDataSelectors.getData);

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
