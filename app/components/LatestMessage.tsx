import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LatestMessageProps, strings } from '../constants';
import { Color, moderateScale } from '../theme';
import { styles } from './styles/LatestMessageStyles';

const LatestMessage = ({ isSendByMe, message }: LatestMessageProps) => {
  const { type, documentName, content } = message;
  const [latestMessage, setLatestMessage] = useState<string | undefined>('');
  const [icon, setIcon] = useState<string>(strings.photoIcon);

  const messageTypeHandler = useCallback(
    (param: string) => {
      const messageType = {
        [strings.imageType]: () => {
          setLatestMessage(strings.photoText);
          setIcon(strings.photoIcon);
        },
        [strings.locationType]: () => {
          setLatestMessage(strings.liveLocation);
          setIcon(strings.locationIcon);
        },
        [strings.document]: () => {
          setLatestMessage(documentName);
          setIcon(strings.documentIcon);
        },
        [strings.textMessageType]: () => {
          setLatestMessage(content);
        },
      };
      return messageType[param]();
    },
    [content, documentName],
  );

  useEffect(() => {
    messageTypeHandler(type);
  }, [messageTypeHandler, type]);

  return (
    <View style={styles.container}>
      {isSendByMe && <Text style={styles.youText}>{strings.you}:</Text>}
      {type !== strings.textMessageType && (
        <Icon
          name={icon}
          size={moderateScale(16)}
          color={Color.darkBlue}
          style={styles.iconStyle}
        />
      )}
      <Text style={styles.lastChatText} ellipsizeMode="tail" numberOfLines={1}>
        {latestMessage}
      </Text>
    </View>
  );
};

export default LatestMessage;
