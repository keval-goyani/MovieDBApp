import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { Message } from '../components';
import { ChatDataType, MessageListDataType, strings } from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import chatAction, { chatDataSelector } from '../redux/ChatRedux';
import { timestampToTime } from '../services';

const MessageList = ({
  chatId,
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
    const subscriber = firestore()
      .collection(strings.chatCollection)
      .doc(chatId)
      .onSnapshot(documentSnapshot => {
        return dispatch(
          chatAction.chatDataSuccess(
            documentSnapshot?.data()?.messageList ?? [],
          ),
        );
      });
    return () => subscriber();
  }, [chatId, dispatch]);

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
        const time: string = timestampToTime(item?.time);
        const chatUsername =
          user?.uid === item?.user ? `${strings.you}` : `${username}`;

        return (
          <Message
            key={index}
            isLeft={item?.user !== currentUser.current}
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
