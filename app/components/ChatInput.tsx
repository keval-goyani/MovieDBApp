import firestore from '@react-native-firebase/firestore';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icons } from '../assets';
import { ChatDataType, ChatInputDataType, strings } from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { styles } from './styles/ChatInputStyles';

const ChatInput: FC<ChatInputDataType> = ({ chatId }) => {
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<ChatDataType[]>([]);
  const { user } = useSelector(authDataSelectors.getData);

  const addToFireStore = useCallback(async () => {
    messageList.length !== 0 &&
      (await firestore()
        .collection(strings.chatCollection)
        .doc(chatId)
        .set({ messageList })
        .catch(e => e));
  }, [chatId, messageList]);

  useEffect(() => {
    addToFireStore();
  }, [addToFireStore]);

  const MessageCreation = async () => {
    const timeStamp = Date.now();
    const data = {
      user: user?.uid,
      time: timeStamp,
      content: message,
    };

    const previousMessage = await firestore()
      .collection(strings.chatCollection)
      .doc(chatId)
      .get()
      .then(documentSnapshot => documentSnapshot.data());
    setMessageList([...(previousMessage?.messageList ?? ''), data]);
  };

  const sendMessageHandler = async () => {
    if (message.trim().length !== 0) {
      await MessageCreation();
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndSend}>
          <TextInput
            multiline
            placeholder={strings.chatPlaceholder}
            style={styles.input}
            onChangeText={text => setMessage(text)}
            value={message}
          />
        </View>
        <TouchableOpacity
          style={styles.sendButtonView}
          onPress={sendMessageHandler}>
          <Image source={Icons.send} style={styles.sendButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
