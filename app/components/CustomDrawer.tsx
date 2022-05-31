import auth from '@react-native-firebase/auth';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { FC, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CustomDrawerDataType, navigationStrings, strings } from '../constants';
import authAction, { authDataSelectors } from '../redux/AuthRedux';
import selectedAction, {
  selectedTabSelectors,
} from '../redux/DrawerSelectRedux';
import { Color, Icons } from '../theme';
import styles from './styles/CustomDrawerStyle';

const CustomDrawer: FC<CustomDrawerDataType> = props => {
  const { user } = useSelector(authDataSelectors.getData);
  const { setActiveTab } = useSelector(selectedTabSelectors.getData);
  const { navigation } = props;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  const getData = (
    selectedItemTab: string,
    navigationString: string,
    type: string,
  ) => {
    switch (type) {
      case strings.tint:
        if (selectedItemTab === navigationString) {
          return { tintColor: Color.white };
        }
        break;
      case strings.back:
        if (selectedItemTab === navigationString) {
          return {
            backgroundColor: Color.blueGreen,
          };
        }
        break;
      case strings.color:
        if (selectedItemTab === navigationString) {
          return { color: Color.white };
        }
        break;
      default:
        return;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{ ...styles.container, ...styles.avatarView }}>
          <Image source={Icons.avatar} style={styles.avatar} />
          <Text style={styles.userEmail}>{user}</Text>
        </View>
        <DrawerItem
          label={navigationStrings.Home}
          onPress={() => {
            dispatch(selectedAction.selected(navigationStrings.Home));
            navigation.navigate(strings.tabRoute, {
              screen: navigationStrings.Home,
            });
          }}
          icon={() => (
            <Image
              source={Icons.homeIcon}
              style={{
                ...styles.icon,
                ...getData(
                  setActiveTab.payload,
                  navigationStrings.Home,
                  strings.tint,
                ),
              }}
            />
          )}
          labelStyle={{
            ...styles.label,
            ...getData(
              setActiveTab.payload,
              navigationStrings.Home,
              strings.color,
            ),
          }}
          style={{
            ...getData(
              setActiveTab.payload,
              navigationStrings.Home,
              strings.back,
            ),
          }}
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
            <Image
              source={Icons.trending}
              style={{
                ...styles.icon,
                ...getData(
                  setActiveTab.payload,
                  navigationStrings.Trailers,
                  strings.tint,
                ),
              }}
            />
          )}
          labelStyle={{
            ...styles.label,
            ...getData(
              setActiveTab.payload,
              navigationStrings.Trailers,
              strings.color,
            ),
          }}
          style={{
            ...getData(
              setActiveTab.payload,
              navigationStrings.Trailers,
              strings.back,
            ),
          }}
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
            <Image
              source={Icons.moviesIcon}
              style={{
                ...styles.icon,
                ...getData(
                  setActiveTab.payload,
                  navigationStrings.Movies,
                  strings.tint,
                ),
              }}
            />
          )}
          labelStyle={{
            ...styles.label,
            ...getData(
              setActiveTab.payload,
              navigationStrings.Movies,
              strings.color,
            ),
          }}
          style={{
            ...getData(
              setActiveTab.payload,
              navigationStrings.Movies,
              strings.back,
            ),
          }}
        />
        <DrawerItem
          label={strings.tvShows}
          onPress={() => {}}
          icon={() => <Image source={Icons.tv} style={styles.icon} />}
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
            <Image
              source={Icons.communityIcon}
              style={{
                ...styles.icon,
                ...getData(
                  setActiveTab.payload,
                  navigationStrings.Community,
                  strings.tint,
                ),
              }}
            />
          )}
          labelStyle={{
            ...styles.label,
            ...getData(
              setActiveTab.payload,
              navigationStrings.Community,
              strings.color,
            ),
          }}
          style={{
            ...getData(
              setActiveTab.payload,
              navigationStrings.Community,
              strings.back,
            ),
          }}
        />
      </DrawerContentScrollView>
      <TouchableOpacity
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
        onPress={() => {
          Alert.alert(strings.warning, strings.confirm, [
            {
              text: strings.cancel,
              style: 'cancel',
            },
            {
              text: strings.ok,
              onPress: () => {
                auth().signOut();

                return dispatch(authAction.logout());
              },
            },
          ]);
        }}>
        <View style={styles.logOutStyle}>
          <Image source={Icons.logout} style={[styles.logOutIcon]} />
          <Text style={styles.logOutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;
