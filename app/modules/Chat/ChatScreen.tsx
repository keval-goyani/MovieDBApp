import React from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Icons } from '../../assets';
import { ChatHeader, ChatInput, MessageList } from '../../components';
import { ChatScreenDataType, strings } from '../../constants';
import { Metrics, verticalScale } from '../../theme';
import { styles } from './styles/ChatScreenStyles';

const ChatScreen = ({ route }: ChatScreenDataType) => {
  const behavior = Metrics.isAndroid ? 'height' : 'padding';
  const verticalOffset = Metrics.isAndroid
    ? verticalScale(25)
    : verticalScale(45);
  const { chatId, username } = route.params;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={behavior}
      keyboardVerticalOffset={verticalOffset}>
      <ChatHeader
        username={username ?? strings.user}
        picture={Icons.avatar}
        onlineStatus={strings.onlineStatus}
      />
      <ImageBackground source={Icons.chatBackground} style={styles.container}>
        <MessageList chatId={chatId} />
        <ChatInput chatId={chatId} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
