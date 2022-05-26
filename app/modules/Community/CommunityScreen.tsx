import React from 'react';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components';
import { Color, Icons } from '../../theme';
import styles from './styles/CommunityScreenStyles';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Header leftIcon={Icons.menuIcon} logoIcon={Icons.movieDbIcon} />
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={[
          Color.pistachioDark,
          Color.pistachioMoreDark,
          Color.etonBlue,
          Color.skyBlue,
          Color.blue,
        ]}>
        <View style={styles.image}>
          <Image
            source={Icons.comingSoon}
            style={styles.poster}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default CommunityScreen;
