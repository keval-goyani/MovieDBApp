import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TabBarIcon } from '../components';
import { navigationStrings } from '../constants';
import {
  CommunityScreen,
  HomeScreen,
  MoviesScreen,
  TrailersScreen,
} from '../modules';
import selectedAction from '../redux/DrawerSelectRedux';
import { Color, Icons } from '../theme';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.Home}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Color.lightBlue,
        tabBarInactiveTintColor: Color.white,
        tabBarStyle: {
          backgroundColor: Color.darkBlue,
        },
      }}>
      <Tab.Screen
        listeners={{
          tabPress: () => {
            dispatch(selectedAction.selected(navigationStrings.Home));
          },
        }}
        name={navigationStrings.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.homeIcon} />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            dispatch(selectedAction.selected(navigationStrings.Trailers));
          },
        }}
        name={navigationStrings.Trailers}
        component={TrailersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.trailerIcon} />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            dispatch(selectedAction.selected(navigationStrings.Movies));
          },
        }}
        name={navigationStrings.Movies}
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.moviesIcon} />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            dispatch(selectedAction.selected(navigationStrings.Community));
          },
        }}
        name={navigationStrings.Community}
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.communityIcon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
