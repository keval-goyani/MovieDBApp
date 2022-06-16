import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { CustomShareLocationButton, Header, Map } from '../../components';
import {
  ChatScreenDataType,
  NavigationDataType,
  strings,
} from '../../constants';
import { Icons, Metrics } from '../../theme';
import { styles } from './styles/LocationScreenStyle';

const LocationScreen = ({ route }: ChatScreenDataType) => {
  const { isFromChat, chatId, username, lastLatitude, lastLongitude } =
    route.params;
  const navigation: NavigationDataType = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const chatValue = isFromChat ?? true;
  const headerTitle = isFromChat ? username : strings.sendLocation;

  useEffect(() => {
    if (!isFromChat) {
      Geolocation.getCurrentPosition(data => {
        setLatitude(data?.coords?.latitude);
        setLongitude(data?.coords?.longitude);
      });
    }
  }, [isFromChat]);

  const permissionHandler = (permissionRequest: string) => {
    permissionRequest === RESULTS.GRANTED
      ? Geolocation.getCurrentPosition(data => {
          setLatitude(data?.coords?.latitude);
          setLongitude(data?.coords?.longitude);
        })
      : Alert.alert(strings.turnOn, strings.goToSetting, [
          { onPress: () => openSettings(), text: strings.setting },
          { text: strings.cancel },
        ]);
  };

  const locationHandler = useCallback(async () => {
    let permissionCheck = '';
    if (!Metrics.isAndroid) {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionHandler(permissionRequest);
      }
    }
    if (Metrics.isAndroid) {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionHandler(permissionRequest);
      }
    }
  }, []);

  useEffect(() => {
    locationHandler();
  }, [locationHandler]);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.backIcon}
        logoIcon={Icons.movieDbIcon}
        title={headerTitle}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Map
          isFromChat={chatValue}
          lastLatitude={lastLatitude ?? 0}
          lastLongitude={lastLongitude ?? 0}
          {...{ latitude, longitude }}
        />
      </View>
      <CustomShareLocationButton
        isFromChat={chatValue}
        {...{ chatId, username, latitude, longitude }}
      />
    </View>
  );
};

export default LocationScreen;
