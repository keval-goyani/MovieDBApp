import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { CustomButton } from '../components';
import { ChatMenuDataType, NavigationDataType, strings } from '../constants';
import { clearChat, handleGalleryPermission } from '../services';
import { styles } from './styles/ChatMenuStyles';

const ChatMenu = ({
  setChatWallpaper,
  setShowMenu,
  conversationId,
}: ChatMenuDataType) => {
  const navigation: NavigationDataType = useNavigation();

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
          onPress: () =>
            clearChat({ ...{ navigation, conversationId, setShowMenu } }),
        }}
      />
    </View>
  );
};

export default ChatMenu;
