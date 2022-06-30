import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Attach, Stagger } from '../components';
import { ChatDataType, ChatInputDataType, strings } from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { addChatToFirestore, chatCreation } from '../services';
import { Icons } from '../theme';
import { styles } from './styles/ChatInputStyles';

const ChatInput: FC<ChatInputDataType> = ({
  chatId,
  cameraModal,
  setCameraModal,
  isAttach,
  setIsAttach,
  setImagePath,
  documentData,
  setDocumentData,
  imageUrl,
  setShowMenu,
  username,
}) => {
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<ChatDataType[]>([]);
  const { user } = useSelector(authDataSelectors.getData);
  const messageInput = useRef<TextInput>(null);

  const addToFireStore = useCallback(() => {
    addChatToFirestore(chatId, messageList);
  }, [chatId, messageList]);

  const messageCreation = useCallback(() => {
    const emptyDocument = { documentUrl: '', documentName: '' };

    chatCreation(
      chatId,
      user?.uid ?? '',
      message.trim(),
      strings.textMessageType,
      emptyDocument,
      setMessageList,
    );
  }, [chatId, message, user]);

  const imageMessageCreation = useCallback(() => {
    const emptyDocument = { documentUrl: '', documentName: '' };

    chatCreation(
      chatId,
      user?.uid ?? '',
      imageUrl,
      strings.imageType,
      emptyDocument,
      setMessageList,
    );
  }, [chatId, imageUrl, user]);

  const documentMessageCreation = useCallback(() => {
    const content = '';

    chatCreation(
      chatId,
      user?.uid ?? '',
      content,
      strings.document,
      documentData,
      setMessageList,
    );
  }, [chatId, documentData, user]);

  const sendMessageHandler = useCallback(() => {
    if (message.trim().length !== 0) {
      messageCreation();
      setMessage('');
    }
  }, [messageCreation, message]);

  useEffect(() => {
    addToFireStore();
  }, [addToFireStore]);

  useEffect(() => {
    imageUrl && imageMessageCreation();
  }, [imageMessageCreation, imageUrl]);

  useEffect(() => {
    documentData.documentUrl && documentMessageCreation();
  }, [documentMessageCreation, documentData]);

  useEffect(() => {
    messageInput && messageInput?.current?.focus();
  }, []);

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
            onFocus={() => {
              setCameraModal(false);
              setIsAttach(false);
            }}
            ref={messageInput}
          />
          <TouchableOpacity
            onPress={() => {
              setIsAttach(!isAttach);
              setCameraModal(false);
              setShowMenu(false);
              Keyboard.dismiss();
            }}>
            <Image source={Icons.attach} style={styles.inputIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCameraModal(!cameraModal);
              setIsAttach(false);
              setShowMenu(false);
              Keyboard.dismiss();
            }}>
            <Image source={Icons.camera} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.sendButtonView}
          onPress={() => {
            sendMessageHandler();
            setCameraModal(false);
            setIsAttach(false);
            setShowMenu(false);
          }}>
          <Image source={Icons.send} style={styles.sendButton} />
        </TouchableOpacity>
      </View>
      {cameraModal && (
        <Stagger {...{ cameraModal, setCameraModal, setImagePath }} />
      )}
      {isAttach && (
        <Attach
          {...{
            setIsAttach,
            setImagePath,
            setDocumentData,
            chatId,
            username,
          }}
        />
      )}
    </View>
  );
};

export default ChatInput;
