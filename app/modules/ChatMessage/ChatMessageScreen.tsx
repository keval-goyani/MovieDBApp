import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AddUsersList, Header, SearchUser } from '../../components';
import {
  appConstants,
  NavigationDataType,
  navigationStrings,
  strings,
  UserDataType,
} from '../../constants';
import { userListSelector } from '../../redux/UserListRedux';
import { alertMessage } from '../../services';
import { Icons } from '../../theme';
import { styles } from './styles/ChatMessageScreenStyles';

const ChatMessageScreen = () => {
  const navigation: NavigationDataType = useNavigation();
  const { userList } = useSelector(userListSelector.getData);
  const [usersList, setUsersList] = useState(userList);
  const [selectedUser, setSelectedUsers] = useState<UserDataType[]>([]);

  const navigationHandler = () => {
    navigation.goBack();
    navigation.navigate(navigationStrings.NewGroup, { ...{ selectedUser } });
  };

  const backButtonHandler = () => {
    navigation.navigate(navigationStrings.Community);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Header
          isFromChatMessageScreen={appConstants.trueValue}
          leftIcon={Icons.backIcon}
          rightIcon={Icons.plus}
          logoIcon={Icons.movieDbIcon}
          title={strings.communityMember}
          onPress={backButtonHandler}
          plusButtonOnPress={() => {
            selectedUser.length > 0
              ? navigationHandler()
              : alertMessage(strings.pleaseSelectUser);
          }}
        />
        <SearchUser {...{ setUsersList }} />
        <AddUsersList
          userListData={usersList ?? []}
          {...{ setSelectedUsers }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatMessageScreen;
