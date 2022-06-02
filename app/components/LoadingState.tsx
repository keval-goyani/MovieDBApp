import React from 'react';
import { Image, View } from 'react-native';
import { Icons } from '../theme';
import { CustomLoader } from '../components';
import styles from './styles/LoadingStateStyles';

const LoadingState = ({ searchModal }: { searchModal: boolean }) => {
  return searchModal ? (
    <View style={styles.loadingStyle}>
      <Image source={Icons.notFound} style={styles.image} />
    </View>
  ) : (
    <View style={styles.contentLoader}>
      <CustomLoader />
    </View>
  );
};

export default LoadingState;
