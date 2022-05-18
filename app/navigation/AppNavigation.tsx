import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { navigationStrings } from '../constants';
import { DetailScreen, HomeScreen } from '../modules';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={navigationStrings.HOME} component={HomeScreen} />
        <Stack.Screen
          name={navigationStrings.DETAILS}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
