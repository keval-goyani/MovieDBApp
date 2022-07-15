import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { Message } from '../components';
import {
  appConstants,
  ChatDataType,
  LatestMessageDataType,
  MessageListDataType,
  strings,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import chatAction, { chatDataSelector } from '../redux/ChatRedux';
import { convertToTimestamp, timestampToTime } from '../services';

const MessageList = ({
  conversationId,
  setCameraModal,
  setShowMenu,
  setIsAttach,
  username,
}: MessageListDataType) => {
  const scrollRef = useRef<FlatList>(null);
  const dispatch = useDispatch();
  const { chatData } = useSelector(chatDataSelector.getData);
  const { user } = useSelector(authDataSelectors.getData);
  const currentUser = useRef(user?.uid);

  const fetchRealTimeMessages = useCallback(() => {
    const subscriber = appConstants.messageRef
      .doc(conversationId)
      .collection(strings.messageCollection)
      .orderBy('createdAt', 'asc')
      .onSnapshot(async documentSnapshot => {
        const firestoreChatList: LatestMessageDataType[] = [];

        documentSnapshot?.forEach(document => {
          const chatMessages = document?.data();

          firestoreChatList.push(chatMessages);
        });
        dispatch(chatAction.chatDataSuccess(firestoreChatList));
      });

    return () => subscriber();
  }, [conversationId, dispatch]);

  useEffect(() => {
    fetchRealTimeMessages();
  }, [fetchRealTimeMessages]);

  return (
    <FlatList
      ref={scrollRef}
      data={asMutable(chatData) ?? []}
      onContentSizeChange={() => {
        scrollRef?.current?.scrollToEnd({ animated: true });
      }}
      renderItem={({ item, index }: { item: ChatDataType; index: number }) => {
        const senderId: string = item?.sender?.uid;
        const timeStamp = convertToTimestamp(item?.createdAt);
        const time: string = timestampToTime(timeStamp);
        const chatUsername =
          user?.uid === senderId ? `${strings.you}` : `${username}`;

        return (
          <Message
            key={index}
            isLeft={senderId !== currentUser?.current}
            message={item?.content}
            documentName={item?.documentName ?? ''}
            type={item?.type}
            {...{ chatUsername, time }}
          />
        );
      }}
      bounces={false}
      onTouchStart={() => {
        setCameraModal(false);
        setShowMenu(false);
        setIsAttach(false);
      }}
    />
  );
};

export default MessageList;
