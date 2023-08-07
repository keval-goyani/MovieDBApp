import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Attach, Stagger } from '../components';
import { ChatInputDataType, strings } from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import { chatCreation } from '../services';
import { Color, Icons } from '../theme';
import { styles } from './styles/ChatInputStyles';

const ChatInput: FC<ChatInputDataType> = ({
  conversationId,
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
  receiverId,
  members,
}) => {
  const [message, setMessage] = useState<string>('');
  const { user } = useSelector(authDataSelectors.getData);
  const messageInput = useRef<TextInput>(null);
  const fixedMessage = useMemo(() => {
    return {
      conversationId,
      senderId: user?.uid ?? '',
      receiverId: receiverId ?? '',
      members,
    };
  }, [conversationId, members, receiverId, user]);

  const imageMessageCreation = useCallback(() => {
    const imageMessage = {
      ...fixedMessage,
      content: imageUrl,
      type: strings.imageType,
    };

    chatCreation(imageMessage);
  }, [fixedMessage, imageUrl]);

  const documentMessageCreation = useCallback(() => {
    const { documentName, documentUrl } = documentData;
    const documentMessage = {
      ...fixedMessage,
      content: documentUrl,
      type: strings.document,
      documentName,
    };

    chatCreation(documentMessage);
  }, [documentData, fixedMessage]);

  const textMessageCreation = useCallback(() => {
    const textMessage = {
      ...fixedMessage,
      content: message.trim(),
      type: strings.textMessageType,
    };

    chatCreation(textMessage);
  }, [fixedMessage, message]);

  const sendMessageHandler = useCallback(() => {
    if (message.trim().len gth !== 0) {
      textMessageCreation();
      setMessage('');
    }
  }, [textMessageCreation, message]);

  useEffect(() => {
    imageUrl && imageMessageCreation();
  }, [imageMessageCreation, imageUrl]);

  useEffect(() => {
    documentData?.documentUrl && documentMessageCreation();
  }, [documentMessageCreation, documentData]);

  useEffect(() => {
    messageInput && messageInput?.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndSend}>
          <TextInput
            testID="textInput"
            multiline
            placeholder={strings.chatPlaceholder}
            placeholderTextColor={Color.darkGray}
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
            testID="AttachIcon"
            onPress={() => {
              setIsAttach(!isAttach);
              setCameraModal(false);
              setShowMenu(false);
              Keyboard.dismiss();
            }}>
            <Image source={Icons?.attach} style={styles.inputIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="CameraIcon"
            onPress={() => {
              setCameraModal(!cameraModal);
              setIsAttach(false);
              setShowMenu(false);
              Keyboard.dismiss();
            }}>
            <Image source={Icons?.camera} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          testID="sendButton"
          style={styles.sendButtonView}
          onPress={() => {
            sendMessageHandler();
            setCameraModal(false);
            setIsAttach(false);
            setShowMenu(false);
          }}>
          <Image source={Icons?.send} style={styles.sendButton} />
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
            conversationId,
            username,
            receiverId,
          }}
        />
      )}
    </View>
  );
};

export default ChatInput;
