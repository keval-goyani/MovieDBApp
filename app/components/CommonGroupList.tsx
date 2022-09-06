import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { asMutable } from 'seamless-immutable';
import { ProfileImage } from '../components';
import {
  CommonGroupListProps,
  NavigationDataType,
  navigationStrings,
  RenderItemOfCommonGroupList,
} from '../constants';
import { styles } from './styles/CommonGroupListStyles';

const CommonGroupList = ({ groupList }: CommonGroupListProps) => {
  const navigation: NavigationDataType = useNavigation();

  const renderUserList = ({ item }: RenderItemOfCommonGroupList) => {
    const members = item?.members;
    const membersArray = Object.values(members ?? []);
    const membersList = membersArray.map(list => Object.values(list ?? [])[0]);

    const handleOnPress = () => {
      navigation.navigate(navigationStrings.Chat, {
        ...members,
        conversationId: item?.conversationId,
        groupName: item?.groupName,
        username: item?.groupName,
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
            profileImage={item?.groupImage}
            customStyle={styles.avatar}
            customImageStyles={styles.profileImageStyles}
            groupName={item?.groupName}
          />
          <View style={styles.nameView}>
            <Text style={styles.text}>{item?.groupName}</Text>
            <Text
              style={styles.lastChatText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {`${membersList},`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={asMutable(groupList) ?? []}
      renderItem={renderUserList}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default CommonGroupList;
