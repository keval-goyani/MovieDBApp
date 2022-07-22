import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { StaggerDataType } from '../constants';
import { handleCameraPermission, handleGalleryPermission } from '../services';
import { Icons } from '../theme';
import { styles } from './styles/StaggerStyles';

const Stagger = ({ setCameraModal, setImagePath }: StaggerDataType) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cameraContainer}
        onPress={() => {
          handleCameraPermission(setImagePath);
          setCameraModal(false);
        }}>
        <Image source={Icons.cameraIcon} style={styles.cameraIconStyle} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.galleryContainer}
        onPress={() => {
          handleGalleryPermission(setImagePath);
          setCameraModal(false);
        }}>
        <Image source={Icons.galleryIcon} style={styles.galleryIconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default Stagger;
