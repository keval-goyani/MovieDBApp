import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { MessageDataType } from '../constants';
import { Color } from '../theme';
import { styles } from './styles/MessageStyles';

const Message = ({ time, isLeft, message }: MessageDataType) => {
  const messageContainerStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.messageContainer,
    isLeft && {
      alignSelf: 'flex-start',
      backgroundColor: Color.pistachioDark,
    },
  ]);
  const messageStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    styles.message,
    isLeft && { color: Color.black },
  ]);
  const timeStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    styles.time,
    isLeft && { color: Color.gray },
  ]);

  return (
    <View style={styles.container}>
      <View style={messageContainerStyle}>
        <View style={styles.messageView}>
          <Text style={messageStyle}>{message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={timeStyle}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Message;
