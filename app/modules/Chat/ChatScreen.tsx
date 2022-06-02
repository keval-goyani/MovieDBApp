import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Icons } from '../../assets';
import { Header } from '../../components';
import { NavigationDataType, strings } from '../../constants';
import { styles } from './styles/ChatScreenStyles';

const ChatScreen = () => {
  const navigation: NavigationDataType = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.backIcon}
        logoIcon={Icons.movieDbIcon}
        onPress={() => navigation.goBack()}
      />
      <ImageBackground source={Icons.chatBackground} style={styles.container}>
        <Text style={styles.text}>{strings.chatScreen}</Text>
      </ImageBackground>
    </View>
  );
};

export default ChatScreen;
