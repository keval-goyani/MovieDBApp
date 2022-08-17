import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { ChatMenu, ProfileImage } from '../components';
import {
  appConstants,
  ChatHeaderDataType,
  NavigationDataType,
} from '../constants';
import { Icons } from '../theme';
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
  receiverId,
  conversationId,
  membersName,
  groupName,
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
            <View style={styles.userNameAndStatus}>
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
