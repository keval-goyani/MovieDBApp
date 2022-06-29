import React, { FC } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageModalDataType } from '../constants';
import { Icons } from '../theme';
import styles from './styles/ImageModalStyles';

const ImageModal: FC<ImageModalDataType> = ({
  message,
  chatUsername,
  time,
  imageVisible,
  setImageVisible,
  showImageDetail,
  setShowImageDetail,
}) => {
  return (
    <Modal visible={imageVisible} onRequestClose={() => setImageVisible(false)}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalView}>
          {showImageDetail && (
            <View style={styles.imageDescription}>
              <TouchableOpacity onPress={() => setImageVisible(false)}>
                <Image source={Icons.backIcon} style={styles.backIconStyle} />
              </TouchableOpacity>
              <View style={styles.description}>
                <Text style={styles.username}>{chatUsername}</Text>
                <Text style={styles.fullImageTime}>{time}</Text>
              </View>
            </View>
          )}
          <View
            onTouchStart={() => {
              setShowImageDetail(!showImageDetail);
            }}>
            <Image source={{ uri: message }} style={styles.fullImage} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageModal;
