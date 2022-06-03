import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Message } from '../components';
import { messagesData } from '../constants';

const MessageList = () => {
  const [messages, setMessages] = useState(messagesData);
  const user = useRef(0);

  return (
    <FlatList
      inverted
      data={messages}
      renderItem={({ item, index }) => (
        <Message
          key={index}
          time={item.time}
          isLeft={item.user !== user.current}
          message={item.content}
        />
      )}
      bounces={false}
    />
  );
};

export default MessageList;
