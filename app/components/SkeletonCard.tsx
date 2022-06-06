import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomSkeleton } from '../components';
import { horizontalScale, verticalScale } from '../theme';
import { styles } from './styles/SkeletonCardStyle';

const SkeletonCard = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <CustomSkeleton
          width={horizontalScale(348)}
          height={verticalScale(233)}
        />
      </View>
      <View style={styles.innerContainer}>
        <CustomSkeleton
          width={horizontalScale(250)}
          height={verticalScale(14)}
        />
      </View>
      <View style={styles.secondContainer}>
        <CustomSkeleton
          width={horizontalScale(300)}
          height={verticalScale(14)}
        />
      </View>
    </SafeAreaView>
  );
};

export default SkeletonCard;
