import React, { FC, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ImageModal } from '../components';
import { ImageMessageDataType } from '../constants';
import styles from './styles/ImageMessageStyles';
import { messagePosition } from './styles/PositionStyles';

const ImageMessage: FC<ImageMessageDataType> = ({
  isLeft,
  message,
  time,
  chatUsername,
}) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [showImageDetail, setShowImageDetail] = useState(false);
  const positionStyles = messagePosition(isLeft);

  return (
    <>
      <TouchableOpacity
        style={[styles.chatImageContainer, positionStyles.contentPosition]}
        onPress={() => setImageVisible(true)}>
        <ImageBackground source={{ uri: message }} style={styles.chatImage}>
          <View style={styles.imageTime}>
            <Text style={styles.time}>{time}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      {imageVisible && (
        <ImageModal
          {...{
            message,
            chatUsername,
            time,
            imageVisible,
            setImageVisible,
            showImageDetail,
            setShowImageDetail,
          }}
        />
      )}
    </>
  );
};

export default ImageMessage;
