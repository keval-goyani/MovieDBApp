import React from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Icons } from '../assets';
import { strings } from '../constants';
import { styles } from './styles/ChatInputStyles';

const ChatInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndSend}>
          <TextInput
            multiline
            placeholder={strings.chatPlaceholder}
            style={styles.input}
            onChangeText={message => message}
          />
        </View>
        <TouchableOpacity style={styles.sendButtonView}>
          <Image source={Icons.send} style={styles.sendButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
