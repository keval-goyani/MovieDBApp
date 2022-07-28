import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { CustomFloatingButton, Header, UsersList } from '../../components';
import {
  NavigationDataType,
  navigationStrings,
  strings,
} from '../../constants';
import { Icons } from '../../theme';
import styles from './styles/CommunityScreenStyles';

const CommunityScreen = () => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.menuIcon}
        logoIcon={Icons.movieDbIcon}
        onPress={() => navigation.openDrawer()}
      />
      <UsersList />
      <CustomFloatingButton
        buttonType={strings.plus}
        onPress={() => navigation.navigate(navigationStrings.ChatMessage)}
      />
    </View>
  );
};

export default CommunityScreen;
