import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../components';
import { ChatMenuDataType, strings } from '../constants';
import clearChatAction from '../redux/ChatRedux';
import { clearChat, handleGalleryPermission } from '../services';
import { styles } from './styles/ChatMenuStyles';

const ChatMenu = ({
  conversationId,
  setChatWallpaper,
  setShowMenu,
}: ChatMenuDataType) => {
  const dispatch = useDispatch();

  const changeWallpaper = () => {
    handleGalleryPermission(setChatWallpaper);
    setShowMenu(false);
  };

  const clearConversation = () => {
    setShowMenu(false);
    dispatch(clearChatAction.chatDataRequest({ conversationId }));
  };

  return (
    <View style={styles.container}>
      <CustomButton
        {...{
          buttonTextStyle: styles.menuItem,
          buttonStyle: styles.menuListItem,
          buttonText: strings.changeWallpaper,
          onPress: changeWallpaper,
        }}
      />
      <CustomButton
        {...{
          buttonStyle: styles.menuListItem,
          buttonTextStyle: styles.menuItem,
          buttonText: strings.clearChat,
          onPress: () => clearChat({ setShowMenu, clearConversation }),
        }}
      />
    </View>
  );
};

export default ChatMenu;
