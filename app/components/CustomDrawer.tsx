import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../assets';
import { CustomDrawerDataType, navigationStrings, strings } from '../constants';
import authAction, { authDataSelectors } from '../redux/AuthRedux';
import styles from './styles/CustomDrawerStyle';

function CustomDrawer(props: CustomDrawerDataType) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(authDataSelectors.getData);

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.scrollView}
      scrollEnabled={false}>
      <View style={{ ...styles.container, ...styles.avatarView }}>
        <Image source={Icons.avatar} style={styles.avatar} />
        <Text style={styles.userEmail}>{user}</Text>
      </View>
      <DrawerItem
        label={strings.home}
        onPress={() => navigation.navigate(navigationStrings.Home)}
        icon={() => <Image source={Icons.homeIcon} style={styles.icon} />}
        labelStyle={styles.label}
      />
      <DrawerItem
        label={strings.trending}
        onPress={() => navigation.navigate(navigationStrings.Trailers)}
        icon={() => <Image source={Icons.trending} style={styles.icon} />}
        labelStyle={styles.label}
      />
      <DrawerItem
        label={strings.movies}
        onPress={() => navigation.navigate(navigationStrings.Movies)}
        icon={() => <Image source={Icons.moviesIcon} style={styles.icon} />}
        labelStyle={styles.label}
      />
      <DrawerItem
        label={strings.tvShows}
        onPress={() => navigation.navigate(navigationStrings.Home)}
        icon={() => <Image source={Icons.tv} style={styles.icon} />}
        labelStyle={styles.label}
      />
      <DrawerItem
        label={strings.people}
        onPress={() => navigation.navigate(navigationStrings.Community)}
        icon={() => <Image source={Icons.communityIcon} style={styles.icon} />}
        labelStyle={styles.label}
      />
      <DrawerItem
        label={strings.logout}
        onPress={() => {
          return dispatch(authAction.logout());
        }}
        icon={() => <Image source={Icons.logout} style={styles.icon} />}
        labelStyle={styles.label}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
