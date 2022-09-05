import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
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
  const [isTextMoving, setIsTextMoving] = useState(appConstants.trueValue);
  const userInfo = userStatus ?? membersName;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Icons.backIcon} style={styles.leftIconStyle} />
        </TouchableOpacity>
        <View style={styles.profileView}>
          <View style={styles.profile}>
            <ProfileImage
              {...{ profileImage, userStatus, groupName }}
              isChatHeader={appConstants.trueValue}
            />
            <Pressable
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
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? Color.transparentGrey
                    : Color.darkBlue,
                },
                styles.userNameAndStatus,
              ]}>
              <Text style={styles.username}>{username}</Text>
              {isTextMoving ? (
                <TextTicker
                  loop={false}
                  bounce={false}
                  style={styles.statusOrMembers}
                  duration={5000}
                  marqueeDelay={1500}
                  onMarqueeComplete={() =>
                    setIsTextMoving(appConstants.falseValue)
                  }>
                  {userInfo}
                </TextTicker>
              ) : (
                <Text numberOfLines={1} style={styles.statusOrMembers}>
                  {userInfo}
                </Text>
              )}
            </Pressable>
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
        <ChatMenu {...{ conversationId, setChatWallpaper, setShowMenu }} />
      )}
    </>
  );
};

export default ChatHeader;
