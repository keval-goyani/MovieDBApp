import React from 'react';
import { ActivityIndicator } from 'react-native';
import { LoaderDataType } from '../constants';

const Loader = ({ animating = false, ...rest }: LoaderDataType) => {
  return <ActivityIndicator {...rest} size="small" animating={animating} />;
};

export default Loader;
