import React from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Icons } from '../../assets';
import { ChatHeader, ChatInput, MessageList } from '../../components';
import { strings } from '../../constants';
import { Metrics, verticalScale } from '../../theme';
import { styles } from './styles/ChatScreenStyles';

const ChatScreen = () => {
  const behavior = Metrics.isAndroid ? 'height' : 'padding';
  const verticalOffset = Metrics.isAndroid
    ? verticalScale(25)
    : verticalScale(45);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={behavior}
      keyboardVerticalOffset={verticalOffset}>
      <ChatHeader
        username={strings.username}
        picture={Icons.avatar}
        onlineStatus={strings.onlineStatus}
      />
      <ImageBackground source={Icons.chatBackground} style={styles.container}>
        <MessageList />
        <ChatInput />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
