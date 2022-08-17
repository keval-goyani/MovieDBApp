import React from 'react';
import { View } from 'react-native';
import {
  ImageMessage,
  Location,
  ShareDocument,
  TextMessage,
} from '../components';
import { MessageDataType, strings } from '../constants';
import styles from './styles/MessageStyles';

const Message = ({
  time,
  isLeft,
  message,
  documentName,
  type,
  chatUsername,
  senderName,
}: MessageDataType) => {
  const file = documentName?.split('.');
  const fileType = file?.[file?.length - 1];

  const showChatMessage = (messageType: string) => {
    switch (messageType) {
      case strings.imageType:
        return (
          <ImageMessage
            {...{ isLeft, message, time, chatUsername, senderName }}
          />
        );
      case strings.locationType:
        return (
          <Location {...{ message, isLeft, time, chatUsername, senderName }} />
        );
      case strings.textMessageType:
        return <TextMessage {...{ isLeft, message, time, senderName }} />;
      case strings.document:
        return (
          <ShareDocument
            {...{ isLeft, message, documentName, fileType, time, senderName }}
          />
        );
    }
  };

  return <View style={styles.container}>{showChatMessage(type)}</View>;
};

export default Message;
