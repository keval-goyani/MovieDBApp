import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AddUsersList, Header, SearchUser } from '../../components';
import { NavigationDataType, strings } from '../../constants';
import { userListSelector } from '../../redux/UserListRedux';
import { Icons } from '../../theme';
import { styles } from './styles/ChatMessageScreenStyles';

const ChatMessageScreen = () => {
  const navigation: NavigationDataType = useNavigation();
  const { userList } = useSelector(userListSelector.getData);
  const [usersList, setUsersList] = useState(userList);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Header
          leftIcon={Icons.backIcon}
          rightIcon={Icons.plus}
          logoIcon={Icons.movieDbIcon}
          title={strings.communityMember}
          onPress={() => navigation.goBack()}
        />
        <SearchUser {...{ setUsersList }} />
        <AddUsersList userListData={usersList} />
      </View>
    </SafeAreaView>
  );
};

export default ChatMessageScreen;
