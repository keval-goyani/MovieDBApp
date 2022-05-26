import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabBarIcon } from '../components';
import { navigationStrings } from '../constants';
import {
  CommunityScreen,
  HomeScreen,
  MoviesScreen,
  TrailersScreen,
} from '../modules';
import { Color, Icons } from '../theme';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.lightBlue,
        tabBarInactiveTintColor: Color.white,
        tabBarStyle: {
          backgroundColor: Color.darkBlue,
        },
      }}>
      <Tab.Screen
        name={navigationStrings.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.homeIcon} />
          ),
        }}
      />
      <Tab.Screen
        name={navigationStrings.Trailers}
        component={TrailersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.trailerIcon} />
          ),
        }}
      />
      <Tab.Screen
        name={navigationStrings.Movies}
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={Icons.moviesIcon} />
          ),
        }}
      />
      <Tab.Screen
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
