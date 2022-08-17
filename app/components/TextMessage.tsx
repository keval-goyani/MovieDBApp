import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { SenderName } from '../components';
import { TextMessageDataType } from '../constants';
import { messagePosition } from './styles/PositionStyles';
import { textMessageStyles } from './styles/TextMessageStyles';

const TextMessage: FC<TextMessageDataType> = ({
  isLeft,
  message,
  time,
  senderName,
}) => {
  const styles = textMessageStyles(isLeft);
  const positionStyles = messagePosition(isLeft);

  return (
    <View style={[styles.messageContainer, positionStyles.contentPosition]}>
      <View style={styles.messageView}>
        <SenderName {...{ senderName }} senderStyle={styles.senderName} />
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.timeView}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default TextMessage;
