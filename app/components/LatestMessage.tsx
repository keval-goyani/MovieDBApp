import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LatestMessageProps, strings } from '../constants';
import { Color } from '../theme';
import { styles } from './styles/LatestMessageStyles';

const LatestMessage = ({ isSendByMe, message }: LatestMessageProps) => {
  const { type, documentName, content } = message;
  const [isText, setIsText] = useState(false);
  const latestMessage = useRef<string | undefined>('');
  const icon = useRef<string>(strings.photoIcon);

  const messageTypeHandler = useCallback(
    (param: string) => {
      let messageType = {
        [strings.imageType]: () => {
          latestMessage.current = strings.photoText;
          icon.current = strings.photoIcon;
        },
        [strings.locationType]: () => {
          latestMessage.current = strings.liveLocation;
          icon.current = strings.locationIcon;
        },
        [strings.document]: () => {
          latestMessage.current = documentName;
          icon.current = strings.documentIcon;
        },
        [strings.textMessageType]: () => {
          latestMessage.current = content;
          setIsText(true);
        },
      };
      return messageType[param]();
    },
    [content, documentName],
  );

  useEffect(() => {
    setIsText(false);
    messageTypeHandler(type);
  }, [messageTypeHandler, type]);

  return (
    <View style={styles.container}>
      {isSendByMe ? <Text style={styles.youText}>{strings.you}:</Text> : <></>}
      {!isText && (
        <Icon
          name={icon.current}
          size={16}
          color={Color.darkBlue}
          style={styles.iconStyle}
        />
      )}
      <Text style={styles.lastChatText} ellipsizeMode="tail" numberOfLines={1}>
        {latestMessage.current}
      </Text>
    </View>
  );
};

export default LatestMessage;
