import storage from '@react-native-firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChatHeader, ChatInput, MessageList } from '../../components';
import {
  appConstants,
  ChatScreenDataType,
  DocumentStateDataType,
  strings,
} from '../../constants';
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
  const { chatId, username, receiverId } = route.params;
  const { wallpaperPath } = useSelector(wallpaperSelectors.getData);
  const [cameraModal, setCameraModal] = useState(false);
  const [isAttach, setIsAttach] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [chatWallpaper, setChatWallpaper] = useState(wallpaperPath);
  const [imageUrl, setImageUrl] = useState('');
  const [documentData, setDocumentData] = useState<DocumentStateDataType>({
    documentUrl: '',
    documentName: '',
  });
  const dispatch = useDispatch();
  const chatBackground = chatWallpaper
    ? { uri: `${strings.files}${chatWallpaper}` }
    : Icons.chatBackground;

  useEffect(() => {
    chatWallpaper && dispatch(wallpaperActions.setWallpaper(chatWallpaper));
  }, [chatWallpaper, dispatch]);

  const chatImageHandler = useCallback(async () => {
    if (imagePath) {
      const selectedImage = imagePath?.split('/');
      const imageName = selectedImage?.[selectedImage?.length - 1];
      const storagePath = `${appConstants.storageImagePath}${imageName}`;

      storage()
        .ref(storagePath)
        .putFile(imagePath)
        .then(response => {
          const stroredImagePath = Metrics.isAndroid
            ? `${appConstants.storageImagePath}${response.metadata.name}`
            : `${response.metadata.name}`;

          storage()
            .ref(stroredImagePath)
            .getDownloadURL()
            .then(remoteImage => setImageUrl(remoteImage));
        })
        .catch(error => alertMessage(error));
    }
  }, [imagePath]);

  useEffect(() => {
    chatImageHandler();
  }, [chatImageHandler]);

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
          setIsAttach,
          setCameraModal,
          setChatWallpaper,
          chatId,
        }}
      />
      <ImageBackground source={chatBackground} style={styles.container}>
        <MessageList
          {...{
            setCameraModal,
            setImagePath,
            setIsAttach,
            username,
            imagePath,
            chatId,
            setShowMenu,
          }}
        />
        <ChatInput
          {...{
            cameraModal,
            setCameraModal,
            isAttach,
            setIsAttach,
            setImagePath,
            documentData,
            setDocumentData,
            setShowMenu,
            chatId,
            imageUrl,
            username,
            receiverId,
          }}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
