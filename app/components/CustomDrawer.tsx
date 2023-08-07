import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Edit from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { CustomDrawerDataType, navigationStrings, strings } from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import selectedAction, {
  selectedTabSelectors,
} from '../redux/DrawerSelectRedux';
import reduxStore from '../redux/store';
import { chatImageHandler, handleLogOut } from '../services';
import { Color, Icons, moderateScale } from '../theme';
import EditProfile from './EditProfile';
import styles from './styles/CustomDrawerStyle';

const CustomDrawer: FC<CustomDrawerDataType> = props => {
  const { user } = useSelector(authDataSelectors.getData);
  const { setActiveTab } = useSelector(selectedTabSelectors.getData);
  const { navigation } = props;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState(strings.emptyString);
  const { persistor } = reduxStore;
  const profileImagestyle = StyleSheet.flatten([
    styles.profile,
    !user?.profileImage && styles.profileBorder,
  ]);

  const getData = (
    selectedItemTab: string,
    navigationString: string,
    type: string,
  ) => {
    const themeType = {
      [strings.tint]: () => {
        if (selectedItemTab === navigationString) {
          return { tintColor: Color.white };
        }
      },
      [strings.back]: () => {
        if (selectedItemTab === navigationString) {
          return { backgroundColor: Color.blueGreen };
        }
      },
      [strings.color]: () => {
        if (selectedItemTab === navigationString) {
          return { color: Color.white };
        }
      },
    };
    return themeType[type]();
  };

  useEffect(() => {
    chatImageHandler({ imagePath, dispatch, setImagePath });
  }, [dispatch, imagePath]);

  const userLogOut = () => {
    Alert.alert(strings.warning, strings.confirm, [
      {
        text: strings.cancel,
        style: 'cancel',
      },
      {
        text: strings.ok,
        onPress: handleLogOut({ dispatch, persistor }),
      },
    ]);
  };

  const homeIconStyle = {
    ...styles.icon,
    ...getData(setActiveTab.payload, navigationStrings.Home, strings.tint),
  };
  const homeLabelStyle = {
    ...styles.label,
    ...getData(setActiveTab.payload, navigationStrings.Home, strings.color),
  };
  const homeActiveTabStyle = {
    ...getData(setActiveTab.payload, navigationStrings.Home, strings.back),
  };
  const trendingIconStyle = {
    ...styles.icon,
    ...getData(setActiveTab.payload, navigationStrings.Trailers, strings.tint),
  };
  const trendingLabelStyle = {
    ...styles.label,
    ...getData(setActiveTab.payload, navigationStrings.Trailers, strings.color),
  };
  const trendingActiveTabStyle = {
    ...getData(setActiveTab.payload, navigationStrings.Trailers, strings.back),
  };
  const movieIconStyle = {
    ...styles.icon,
    ...getData(setActiveTab.payload, navigationStrings.Movies, strings.tint),
  };
  const moviesLabelStyle = {
    ...styles.label,
    ...getData(setActiveTab.payload, navigationStrings.Movies, strings.color),
  };
  const moviesActiveTabStyle = {
    ...getData(setActiveTab.payload, navigationStrings.Movies, strings.back),
  };
  const CommunityIconStyle = {
    ...styles.icon,
    ...getData(setActiveTab.payload, navigationStrings.Community, strings.tint),
  };
  const CommunityLabelStyle = {
    ...styles.label,
    ...getData(
      setActiveTab.payload,
      navigationStrings.Community,
      strings.color,
    ),
  };
  const CommunityActiveTabStyle = {
    ...getData(setActiveTab.payload, navigationStrings.Community, strings.back),
  };

  return (
    <DrawerContentScrollView {...props} style={styles.scrollView}>
      <View style={styles.mainContainer}>
        <View
          style={{
            ...styles.container,
            ...styles.profileView,
          }}>
          <View style={styles.profileImageContainer}>
            {user?.profileImage ? (
              <Image
                source={{
                  uri: user?.profileImage,
                }}
                style={profileImagestyle}
                testID={'user-image'}
              />
            ) : (
              <View style={profileImagestyle}>
                <Image
                  source={Icons?.avatar}
                  style={styles.defaultProfile}
                  testID={'default-profile-image'}
                />
              </View>
            )}
            <TouchableOpacity
              testID="edit-profile"
              style={styles.editProfileButton}
              activeOpacity={0.7}
              onPress={() => setOpen(true)}>
              <Edit
                name={strings.editIcon}
                size={moderateScale(21)}
                color={Color.darkBlue}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
          {open && <EditProfile {...{ setOpen, setImagePath }} />}
          <Text style={styles.userEmail}>{user?.username}</Text>
        </View>
        <DrawerItem
          label={navigationStrings.Home}
          onPress={() => {
            dispatch(selectedAction.selected(navigationStrings.Home));
            navigation.navigate(strings.tabRoute, {
              screen: navigationStrings.Home,
            });
          }}
          icon={() => <Image source={Icons.homeIcon} style={homeIconStyle} />}
          labelStyle={homeLabelStyle}
          style={homeActiveTabStyle}
        />
        <DrawerItem
          label={strings.trending}
          onPress={() => {
            dispatch(selectedAction.selected(navigationStrings.Trailers));
            navigation.navigate(strings.tabRoute, {
              screen: navigationStrings.Trailers,
            });
          }}
          icon={() => (
            <Image source={Icons?.trending} style={trendingIconStyle} />
          )}
          labelStyle={trendingLabelStyle}
          style={trendingActiveTabStyle}
        />
        <DrawerItem
          label={strings.movies}
          onPress={() => {
            dispatch(selectedAction.selected(navigationStrings.Movies));
            navigation.navigate(strings.tabRoute, {
              screen: navigationStrings.Movies,
            });
          }}
          icon={() => (
            <Image source={Icons?.moviesIcon} style={movieIconStyle} />
          )}
          labelStyle={moviesLabelStyle}
          style={moviesActiveTabStyle}
        />
        <DrawerItem
          label={strings.tvShows}
          onPress={() => {}}
          icon={() => <Image source={Icons?.tv} style={styles.icon} />}
          labelStyle={styles.label}
        />
        <DrawerItem
          label={strings.people}
          onPress={() => {
            dispatch(selectedAction.selected(navigationStrings.Community));
            navigation.navigate(strings.tabRoute, {
              screen: navigationStrings.Community,
            });
          }}
          icon={() => (
            <Image source={Icons?.communityIcon} style={CommunityIconStyle} />
          )}
          labelStyle={CommunityLabelStyle}
          style={CommunityActiveTabStyle}
        />
        <View style={styles.logOutButtonContainer}>
          <TouchableOpacity
            testID="logout-button"
            activeOpacity={3}
            style={[
              styles.touchable,
              {
                backgroundColor: selected ? Color.blueGreen : Color.darkBlue,
              },
            ]}
            onPressOut={() => {
              setSelected(false);
            }}
            onPressIn={() => {
              setSelected(true);
            }}
            onPress={userLogOut}>
            <View style={styles.logOutStyle}>
              <Image source={Icons?.logout} style={[styles.logOutIcon]} />
              <Text style={styles.logOutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
