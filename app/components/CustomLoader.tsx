import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Color, horizontalScale, verticalScale } from '../theme';

const CustomLoader = () => {
  return (
    <ContentLoader
      speed={2}
      backgroundColor={Color.darkBlue}
      foregroundColor={Color.lightGreen}>
      <Rect
        x="10"
        y="0"
        rx="5"
        ry="5"
        width={horizontalScale(325)}
        height={verticalScale(220)}
      />
      <Rect
        x="10"
        y="235"
        rx="4"
        ry="4"
        width={horizontalScale(280)}
        height={verticalScale(10)}
      />
      <Rect
        x="10"
        y="250"
        rx="4"
        ry="4"
        width={horizontalScale(320)}
        height={verticalScale(10)}
      />
    </ContentLoader>
  );
};

export default CustomLoader;
