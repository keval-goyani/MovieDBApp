import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import { EditProfileProps, strings } from '../constants';
import { handleCameraPermission, handleGalleryPermission } from '../services';
import { Color, Icons, moderateScale } from '../theme';
import { styles } from './styles/EditProfileStyles';

const EditProfile = ({ setOpen, setImagePath }: EditProfileProps) => {
  const isProfile = true;

  return (
    <>
      <Modal transparent={true}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={styles.firstContainer} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.profileContainer}>
              <Text style={styles.profileText}>{strings.profilePhoto}</Text>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => setOpen(false)}>
                <Delete
                  name={strings.delete}
                  size={moderateScale(22)}
                  color={Color.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.optionsContainer}>
                <View style={styles.optionContainer}>
                  <TouchableOpacity
                    style={styles.cameraContainer}
                    onPress={() => {
                      handleCameraPermission(setImagePath, isProfile);
                      setOpen(false);
                    }}>
                    <Image
                      source={Icons.cameraIcon}
                      style={styles.cameraIconStyle}
                    />
                  </TouchableOpacity>
                  <Text style={styles.optionsText}>{strings.camera}</Text>
                </View>
                <View style={styles.optionContainer}>
                  <TouchableOpacity
                    style={styles.galleryContainer}
                    onPress={() => {
                      handleGalleryPermission(setImagePath, isProfile);
                      setOpen(false);
                    }}>
                    <Image
                      source={Icons.galleryIcon}
                      style={styles.galleryIconStyle}
                    />
                  </TouchableOpacity>
                  <Text style={styles.optionsText}>{strings.gallery}</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default EditProfile;
