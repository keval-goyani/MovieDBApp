import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChatHeader, ChatInput, MessageList } from '../../components';
import { ChatScreenDataType, strings } from '../../constants';
import wallpaperActions, {
  wallpaperSelectors,
} from '../../redux/ChatWallpaperRedux';
import { alertMessage } from '../../services';
import { Icons, Metrics, verticalScale } from '../../theme';
import { styles } from './styles/ChatScreenStyles';

const ChatScreen = ({ route }: ChatScreenDataType) => {
  const behavior = Metrics.isAndroid ? 'height' : 'padding';
  const verticalOffset = Metrics.isAndroid
    ? verticalScale(25)
    : verticalScale(45);
  const { chatId, username } = route.params;
  const [cameraModal, setCameraModal] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const dispatch = useDispatch();
  const { wallpaperPath } = useSelector(wallpaperSelectors.getData);
  const [showMenu, setShowMenu] = useState(false);
  const [chatWallpaper, setChatWallpaper] = useState(wallpaperPath);
  const chatBackground = chatWallpaper
    ? { uri: `${strings.files}${chatWallpaper}` }
    : Icons.chatBackground;

  useEffect(() => {
    chatWallpaper && dispatch(wallpaperActions.setWallpaper(chatWallpaper));
  }, [chatWallpaper, dispatch]);

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
        {...{
          username: username ?? strings.user,
          picture: Icons.avatar,
          onlineStatus: strings.onlineStatus,
          showMenu,
          setShowMenu,
          setChatWallpaper,
        }}
      />
      <ImageBackground source={chatBackground} style={styles.container}>
        <MessageList
          {...{
            setCameraModal,
            setImagePath,
            imagePath,
            chatId,
            setShowMenu,
          }}
        />
        <ChatInput {...{ cameraModal, setCameraModal, setImagePath, chatId }} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
