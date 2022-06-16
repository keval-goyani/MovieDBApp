import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { StaggerDataType } from '../constants';
import { handleCameraPermission, handleGalleryPermission } from '../services';
import { Icons } from '../theme';
import { styles } from './styles/StaggerStyles';

const Stagger = ({
  cameraModal,
  setCameraModal,
  setImagePath,
}: StaggerDataType) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconCamera}
        onPress={() => {
          handleCameraPermission(setImagePath);
          setCameraModal(!cameraModal);
        }}>
        <Image source={Icons.camera} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconGallery}
        onPress={() => {
          handleGalleryPermission(setImagePath);
          setCameraModal(!cameraModal);
        }}>
        <Image source={Icons.gallery} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Stagger;
