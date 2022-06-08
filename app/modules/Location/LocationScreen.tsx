import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { Header } from '../../components';
import { strings } from '../../constants';
import { Color, Icons, Metrics } from '../../theme';
import { styles } from './styles/LocationScreenStyle';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setLatitude(data.coords.latitude);
      setLongitude(data.coords.longitude);
    });
  }, []);

  const permissionHandler = (permissionRequest: string) => {
    permissionRequest === RESULTS.GRANTED
      ? Geolocation.getCurrentPosition(data => {
          setLatitude(data.coords.latitude);
          setLongitude(data.coords.longitude);
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
        onPress={() => navigation.goBack}
      />
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Circle
            strokeColor={Color.lightSky}
            center={{ latitude: latitude, longitude: longitude }}
            radius={100}
            fillColor={Color.powderBlue}
          />
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </MapView>
      </View>
      <View style={styles.shareButton}>
        <TouchableOpacity style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image source={Icons.location} style={styles.locationIcon} />
          </View>
          <Text style={styles.text}>{strings.shareLiveLocation}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationScreen;
