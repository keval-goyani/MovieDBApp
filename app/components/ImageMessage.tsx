import React, { FC, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ImageModal, SenderName } from '../components';
import { ImageMessageDataType } from '../constants';
import styles from './styles/ImageMessageStyles';
import { messagePosition } from './styles/PositionStyles';

const ImageMessage: FC<ImageMessageDataType> = ({
  isLeft,
  message,
  time,
  chatUsername,
  senderName,
}) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [showImageDetail, setShowImageDetail] = useState(false);
  const positionStyles = messagePosition(isLeft);
  const userName = senderName ? senderName : chatUsername;

  return (
    <>
      <TouchableOpacity
        style={[styles.chatImageContainer, positionStyles.contentPosition]}
        onPress={() => setImageVisible(true)}>
        <SenderName {...{ senderName }} senderStyle={styles.senderName} />
        <ImageBackground
          source={{ uri: message }}
          style={styles.chatImage}
          imageStyle={styles.chatImageRadius}>
          <View style={styles.imageTime}>
            <Text style={styles.time}>{time}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      {imageVisible && (
        <ImageModal
          {...{
            message,
            userName,
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
