import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  PressableStateCallbackType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatMenu, ProfileImage } from '../components';
import {
  appConstants,
  ChatHeaderDataType,
  NavigationDataType,
  navigationStrings,
} from '../constants';
import { Color, Icons } from '../theme';
import { styles } from './styles/ChatHeaderStyles';

const ChatHeader = ({
  username,
  profileImage,
  userStatus,
  showMenu,
  setShowMenu,
  setIsAttach,
  setCameraModal,
  setChatWallpaper,
  conversationId,
  membersName,
  groupName,
  userEmail,
  receiverId,
}: ChatHeaderDataType) => {
  const navigation: NavigationDataType = useNavigation();
  const userInfo = userStatus ?? membersName;

  const styleFn = ({ pressed }: PressableStateCallbackType) => [
    {
      backgroundColor: pressed ? Color.transparentGrey : Color.darkBlue,
    },
    styles.userNameAndStatus,
  ];

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          testID={'goBackButton'}>
          <Image source={Icons?.backIcon} style={styles.leftIconStyle} />
        </TouchableOpacity>
        <View style={styles.profileView}>
          <View style={styles.profile}>
            <ProfileImage
              {...{ profileImage, userStatus, groupName }}
              isChatHeader={appConstants.trueValue}
            />
            <Pressable
              testID={'profileImagePressable'}
              onPress={() =>
                navigation.navigate(navigationStrings.ProfileInfo, {
                  profileImage,
                  username,
                  userEmail,
                  conversationId,
                  receiverId,
                  groupName,
                })
              }
              style={styleFn}>
              <Text style={styles.username}>{username}</Text>
              <Text numberOfLines={1} style={styles.statusOrMembers}>
                {userInfo}
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          testID={'dotsMenu'}
          onPress={() => {
            setShowMenu(!showMenu);
            setIsAttach(false);
            setCameraModal(false);
          }}>
          <Image source={Icons?.dotMenu} style={styles.dotsMenu} />
        </Pressable>
      </View>
      {showMenu && (
        <ChatMenu {...{ conversationId, setChatWallpaper, setShowMenu }} />
      )}
    </>
  );
};

export default ChatHeader;
