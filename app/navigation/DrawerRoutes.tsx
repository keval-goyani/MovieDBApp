import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Image } from 'react-native';
import { Icons } from '../assets';
import CustomDrawer from '../components/CustomDrawer';
import { navigationStrings, strings } from '../constants';
import { TabRoutes } from '../navigation';
import { Color, styles } from '../theme';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName={navigationStrings.HomeTab}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: styles.labelStyle,
        drawerActiveBackgroundColor: Color.blueGreen,
        drawerActiveTintColor: Color.darkBlue,
        drawerInactiveTintColor: Color.white,
        drawerType: 'front',
        keyboardDismissMode: 'on-drag',
      }}
      backBehavior="history"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={strings.tabRoute}
        component={TabRoutes}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              source={Icons.homeIcon}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
