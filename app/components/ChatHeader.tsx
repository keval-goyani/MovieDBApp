import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ChatMenu } from '../components';
import { ChatHeaderDataType, NavigationDataType } from '../constants';
import { Icons } from '../theme';
import { styles } from './styles/ChatHeaderStyles';

const ChatHeader = ({
  username,
  picture,
  onlineStatus,
  showMenu,
  setShowMenu,
  setIsAttach,
  setCameraModal,
  setChatWallpaper,
  receiverId,
  conversationId,
}: ChatHeaderDataType) => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Icons.backIcon} style={styles.leftIconStyle} />
        </TouchableOpacity>
        <View style={styles.profileView}>
          <View style={styles.profile}>
            <Image source={picture} style={styles.avatarImage} />
            <View style={styles.userNameAndOnlineStatus}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.onlineStatus}>{onlineStatus}</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            setShowMenu(!showMenu);
            setIsAttach(false);
            setCameraModal(false);
          }}>
          <Image source={Icons.dotMenu} style={styles.dotsMenu} />
        </Pressable>
      </View>
      {showMenu && (
        <ChatMenu
          {...{ conversationId, receiverId, setChatWallpaper, setShowMenu }}
        />
      )}
    </>
  );
};

export default ChatHeader;
