import React from 'react';
import { View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapDataProps } from '../constants';
import { Color } from '../theme';
import { styles } from './styles/MapStyles';

const Map = ({
  isFromChat,
  longitude,
  latitude,
  lastLatitude,
  lastLongitude,
}: MapDataProps) => {
  const chatLatitude = isFromChat ? lastLatitude : latitude;
  const chatLongitude = isFromChat ? lastLongitude : longitude;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: chatLatitude,
          longitude: chatLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Circle
          strokeColor={Color.lightSky}
          center={{
            latitude: chatLatitude,
            longitude: chatLongitude,
          }}
          radius={100}
          fillColor={Color.powderBlue}
        />
        <Marker
          coordinate={{
            latitude: chatLatitude,
            longitude: chatLongitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;
