import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChatMenuDataType, strings } from '../constants';
import { handleGalleryPermission } from '../services';
import { styles } from './styles/ChatMenuStyles';

const ChatMenu = ({ setChatWallpaper, setShowMenu }: ChatMenuDataType) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          handleGalleryPermission(setChatWallpaper);
          setShowMenu(false);
        }}>
        <Text style={styles.menuItem}>{strings.changeWallpaper}</Text>
      </Pressable>
    </View>
  );
};

export default ChatMenu;
