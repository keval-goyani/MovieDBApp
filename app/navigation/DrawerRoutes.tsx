import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Icons } from '../assets';
import { CustomDrawer } from '../components';
import { navigationStrings, strings } from '../constants';
import { TabRoutes } from '../navigation';
import selectedAction from '../redux/DrawerSelectRedux';
import { styles } from './styles/DrawerRoutesStyles';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedAction.selected(navigationStrings.Home));
  }, [dispatch]);

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
      <Drawer.Screen
        name={strings.tabRoute}
        component={TabRoutes}
        options={{
          drawerIcon: ({ color }) => {
            const drawerStyles = styles(color);

            return (
              <Image source={Icons.homeIcon} style={drawerStyles.iconColor} />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
