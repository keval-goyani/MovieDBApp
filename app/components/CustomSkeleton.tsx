import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SkeletonProps } from '../constants';
import { styles } from './styles/CustomSkeletonStyle';

const CustomSkeleton = ({ width, height }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 800,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      testID={'Skeleton'}
      style={[{ opacity: opacity.current, height, width }, styles.skeleton]}
    />
  );
};

export default CustomSkeleton;
