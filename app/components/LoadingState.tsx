import React from 'react';
import { Image, View } from 'react-native';
import { SkeletonCard } from '../components';
import { LoadingStateProps } from '../constants';
import { Icons } from '../theme';
import styles from './styles/LoadingStateStyles';

const LoadingState = ({
  searchModal,
  latestSkeletonStyle,
}: LoadingStateProps) => {
  return searchModal ? (
    <View style={styles.loadingStyle}>
      <Image source={Icons.notFound} style={styles.image} />
    </View>
  ) : (
    <View style={(styles.contentLoader, latestSkeletonStyle)}>
      <SkeletonCard />
    </View>
  );
};

export default LoadingState;
