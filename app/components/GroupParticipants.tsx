import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ProfileImage } from '../components';
import {
  GroupParticipantsProps,
  NavigationDataType,
  navigationStrings,
  RenderItemOfGroupParticipants,
  strings,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { styles } from './styles/GroupParticipantsStyles';

const GroupParticipants = ({
  groupList,
  groupInitializerId,
  conversationId,
}: GroupParticipantsProps) => {
  const navigation: NavigationDataType = useNavigation();
  const { user } = useSelector(authDataSelectors.getData);

  const renderUserList = ({ item }: RenderItemOfGroupParticipants) => {
    const handleOnPress = () => {
      navigation.navigate(navigationStrings.Chat, {
        conversationId,
        username: item?.username,
        receiverId: item?.uid,
        userStatus: item?.status,
        profileImage: item?.profileImage,
      });
    };

    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleOnPress()}
        activeOpacity={0.8}>
        <View style={styles.itemContainer}>
          <ProfileImage
            profileImage={item?.profileImage}
            customStyle={styles.avatar}
            defaultUserImageStyle={styles.profileImageStyles}
          />
          <View style={styles.nameView}>
            <Text style={styles.text}>
              {user?.uid === item?.uid ? strings.you : item?.username}
            </Text>
            <Text
              style={styles.emailText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {`${item.email}`}
            </Text>
          </View>
          {item?.uid === groupInitializerId && (
            <View style={styles.adminContainer}>
              <Text style={styles.groupAdminText}>{strings.groupAdmin}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={groupList ?? []}
      renderItem={renderUserList}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default GroupParticipants;
