import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { CustomButton } from '../components';
import { ChatMenuDataType, strings } from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { clearChat, handleGalleryPermission } from '../services';
import { styles } from './styles/ChatMenuStyles';

const ChatMenu = ({
  conversationId,
  receiverId,
  setChatWallpaper,
  setShowMenu,
}: ChatMenuDataType) => {
  const { user } = useSelector(authDataSelectors.getData);

  const changeWallpaper = () => {
    handleGalleryPermission(setChatWallpaper);
    setShowMenu(false);
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
          onPress: () => {
            clearChat({
              ...{ conversationId, setShowMenu, receiverId },
              senderId: user?.uid ?? '',
            });
          },
        }}
      />
    </View>
  );
};

export default ChatMenu;
