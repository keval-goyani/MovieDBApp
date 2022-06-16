import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Icons } from '../../assets';
import { ChatHeader, ChatInput, MessageList } from '../../components';
import { ChatScreenDataType, strings } from '../../constants';
import { alertMessage } from '../../services';
import { Metrics, verticalScale } from '../../theme';
import { styles } from './styles/ChatScreenStyles';

const ChatScreen = ({ route }: ChatScreenDataType) => {
  const behavior = Metrics.isAndroid ? 'height' : 'padding';
  const verticalOffset = Metrics.isAndroid
    ? verticalScale(25)
    : verticalScale(45);
  const { chatId, username } = route.params;
  const [cameraModal, setCameraModal] = useState(false);
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    if (imagePath) {
      const selectedImage = imagePath.split('/');
      const imageName = selectedImage[selectedImage.length - 1];

      storage()
        .ref(imageName)
        .putFile(imagePath)
        .then(response => response)
        .catch(error => alertMessage(error));
    }
  }, [imagePath]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={behavior}
      keyboardVerticalOffset={verticalOffset}>
      <ChatHeader
        username={username ?? strings.user}
        picture={Icons.avatar}
        onlineStatus={strings.onlineStatus}
      />
      <ImageBackground source={Icons.chatBackground} style={styles.container}>
        <MessageList {...{ setCameraModal, setImagePath, imagePath, chatId }} />
        <ChatInput {...{ cameraModal, setCameraModal, setImagePath, chatId }} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
