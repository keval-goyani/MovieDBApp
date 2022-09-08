import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useSelector } from 'react-redux';
import { CustomProfileCard, Header, ProfileInfo } from '../../components';
import {
  FilterImageDataProps,
  ImageDataProps,
  NavigationDataType,
  ProfileInfoScreenProps,
  strings,
  UserDataType,
} from '../../constants';
import { chatDataSelector } from '../../redux/ChatRedux';
import { chatUserListSelector } from '../../redux/ChatUserListRedux';
import { dateConvertor, timestampToTime } from '../../services';
import { Icons } from '../../theme';
import { styles } from './styles/ProfileInfoScreenStyles';

const ProfileInfoScreen = ({ route }: ProfileInfoScreenProps) => {
  const {
    profileImage,
    username,
    userEmail,
    conversationId,
    receiverId,
    groupName,
  } = route.params;
  const { chatData } = useSelector(chatDataSelector.getData);
  const { userList } = useSelector(chatUserListSelector.getData);

  const GroupList = userList?.filter(
    groups => Object.keys(groups)[0] === strings.members,
  );

  const membersList = GroupList?.filter(
    listMembers => Object.keys(listMembers)?.[0] === strings.members,
  ).filter(item => item?.members?.hasOwnProperty(receiverId)!);

  const allData = chatData[conversationId as keyof typeof chatData].data;

  const particularGroup = GroupList?.filter(
    groupname => Object.keys(groupname)?.[1] === strings.groupname,
  ).filter(item => item?.groupName === username);

  const groupParticipants = particularGroup[0]?.members;
  const groupInitializerId = particularGroup[0]?.groupInitializerId;
  const createdBy = particularGroup[0]?.createdBy;
  const createdAt = particularGroup[0]?.createdAt;
  const time = timestampToTime(createdAt);
  const date = dateConvertor(createdAt);
  const navigation: NavigationDataType = useNavigation();
  const isEmail: boolean = userEmail ? true : false;
  const membersArray: UserDataType[] = Object.values(groupParticipants ?? []);

  const imageData: ImageDataProps[] = allData?.filter(
    (filteredList: FilterImageDataProps) => filteredList.type === strings.image,
  );

  return (
    <View style={styles.container}>
      <Header leftIcon={Icons.backIcon} onPress={() => navigation.goBack()} />
      <View style={styles.innerContainer}>
        <ScrollView style={styles.scrollContainer} bounces={false}>
          <View style={styles.componentsContainer}>
            <ProfileInfo
              imageData={imageData ?? []}
              membersList={membersList ?? []}
              {...{
                isEmail,
                membersArray,
                groupInitializerId,
                createdBy,
                time,
                date,
                conversationId,
              }}
            />
            <CustomProfileCard
              arrayLength={membersArray.length}
              {...{ profileImage, username, isEmail, userEmail, groupName }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileInfoScreen;
