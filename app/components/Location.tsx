import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  ChatInputDataType,
  LocationCoordsProps,
  NavigationDataType,
  navigationStrings,
  strings,
} from '../constants';
import { Color } from '../theme';
import { styles } from './styles/LocationStyles';

const Location = ({ username }: ChatInputDataType) => {
  const navigation: NavigationDataType = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [lastLatitude, setLastLatitude] = useState(latitude);
  const [lastLongitude, setLastLongitude] = useState(longitude);
  const [isSharing, setIsSharing] = useState(true);

  const fixPayload = {
    isFromChat: true,
    lastLatitude: latitude,
    lastLongitude: longitude,
    ...{ username },
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      setLatitude(data?.coords?.latitude);
      setLongitude(data?.coords?.longitude);
    });
  }, []);

  const stopShareLiveLocation = ({
    endedLatitude,
    endedLongitude,
  }: LocationCoordsProps) => {
    setLastLatitude(endedLatitude);
    setLastLongitude(endedLongitude);
  };

  const stopShareHandler = (coordinates: LocationCoordsProps) => {
    Alert.alert(strings.areYouSure, strings.stopShareLiveLocation, [
      { text: strings.cancel, style: 'cancel' },
      {
        text: strings.stop,
        onPress: () => {
          setIsSharing(false);
          stopShareLiveLocation(coordinates);
        },
      },
    ]);
  };

  const mapNavigationHandler = () => {
    navigation.navigate(
      navigationStrings.Location,
      isSharing
        ? fixPayload
        : {
            ...fixPayload,
            lastLatitude: lastLatitude,
            lastLongitude: lastLongitude,
          },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.shareLocationContainer}>
        <TouchableOpacity
          style={styles.shareLocationView}
          activeOpacity={0.5}
          onPress={mapNavigationHandler}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.chatMap}
            region={{
              latitude: isSharing ? latitude : lastLatitude,
              longitude: isSharing ? longitude : lastLongitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Circle
              strokeColor={Color.lightSky}
              center={{ latitude: latitude, longitude: longitude }}
              radius={200}
              fillColor={Color.powderBlue}
            />
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
            />
          </MapView>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stopButtonStyle}
          onPress={() => {
            isSharing &&
              stopShareHandler({
                endedLatitude: latitude,
                endedLongitude: longitude,
              });
          }}>
          <Text style={isSharing ? styles.text : styles.locationEnded}>
            {isSharing ? strings.stopShare : strings.liveLocationEnded}
          </Text>
          <Text style={styles.timeStyle}>{strings.staticTime}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;
