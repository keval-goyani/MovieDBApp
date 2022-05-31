import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../components/CustomDrawer';
import { navigationStrings } from '../constants';
import { TabRoutes } from '../navigation';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName={navigationStrings.HomeTab}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        keyboardDismissMode: 'on-drag',
      }}
      backBehavior="history"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={navigationStrings.HomeTab} component={TabRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
