import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import { Metrics } from '../theme';

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
  const { data, clearChatLength } = chatData?.[conversationId] ?? {
    data: appConstants.emptyArray,
    clearChatLength: Metrics.zero,
  };

  const fetchRealTimeMessages = useCallback(async () => {
    const subscriber = appConstants.messageRef
      .doc(conversationId)
      .collection(strings.messageCollection)
      .orderBy('createdAt', 'asc')
      .onSnapshot(async documentSnapshot => {
        const firestoreChatList: LatestMessageDataType[] = [];
        if (
          !documentSnapshot.metadata.hasPendingWrites &&
          !documentSnapshot.empty
        ) {
          documentSnapshot?.forEach(document => {
            const chatMessage = document?.data();
            firestoreChatList.push(chatMessage);
          });

          firestoreChatList.splice(
            Metrics.zero,
            clearChatLength ?? Metrics.zero,
          );
          dispatch(
            chatAction.chatDataRequest({
              data: firestoreChatList,
              conversationId,
            }),
          );
        }
      });

    return () => subscriber();
  }, [clearChatLength, conversationId, dispatch]);

  useEffect(() => {
    fetchRealTimeMessages();
  }, [fetchRealTimeMessages]);

  return (
    <FlatList
      ref={scrollRef}
      data={data ?? []}
      onContentSizeChange={() => {
        scrollRef?.current?.scrollToEnd({ animated: true });
      }}
      renderItem={({ item, index }: { item: ChatDataType; index: number }) => {
        const sender = item?.sender;
        const timeStamp = convertToTimestamp(item?.createdAt);
        const time: string = timestampToTime(timeStamp);
        const chatUsername =
          user?.uid === sender?.uid ? `${strings.you}` : `${username}`;
        const senderName =
          item?.payload === strings.group && chatUsername === username
            ? sender?.username
            : strings.emptyString;

        return (
          <Message
            key={index}
            isLeft={sender?.uid !== currentUser?.current}
            message={item?.content}
            documentName={item?.documentName ?? ''}
            type={item?.type}
            {...{ chatUsername, time, senderName }}
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
