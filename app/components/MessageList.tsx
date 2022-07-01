import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import { Message } from '../components';
import {
  appConstants,
  ChatDataType,
  MessageListDataType,
  strings,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import chatAction, { chatDataSelector } from '../redux/ChatRedux';
import { decryptData, timestampToTime } from '../services';

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
    const subscriber = appConstants.chatRef
      .doc(chatId)
      .collection(strings.messageCollection)
      .orderBy('time', 'asc')
      .onSnapshot(documentSnapshot => {
        console.log(documentSnapshot?.docs, 'Data');

        // return dispatch(
        //   chatAction.chatDataSuccess(documentSnapshot?.data() ?? []),
        // );
      });
    return () => subscriber();
  }, [chatId]);

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
            message={decryptData(item?.content)}
            documentName={decryptData(item?.documentName ?? '')}
            type={decryptData(item?.type)}
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
