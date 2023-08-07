import { navigation } from '@react-navigation/native';
import { act, fireEvent, render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { ChatHeader } from '../../../app/components';

const setShowMenu = jest.fn();
const setIsAttach = jest.fn();
const setCameraModal = jest.fn();
const showMenu = false;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('chatHeader', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
  });
  it('should take snapShot of chatHeader', () => {
    const { toJSON } = render(<ChatHeader membersName="chandani" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should click the goBackButton', () => {
    const { getByTestId } = render(<ChatHeader />);
    const goBackButton = getByTestId('goBackButton');
    fireEvent.press(goBackButton);
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('should change background color to transparent grey when pressed', async () => {
    const { UNSAFE_getAllByType } = render(<ChatHeader />);
    const pressable = await UNSAFE_getAllByType(Pressable);
    const firstPressable = pressable[0];
    const styleFunction = firstPressable.props.style;

    act(() => {
      const expectedStyle = styleFunction({ pressed: true });
      expect(expectedStyle[0].backgroundColor).toEqual('#c1c6c520');
    });
  });

  it('should change background color to dark Blue when button is not pressed', async () => {
    const { UNSAFE_getAllByType } = render(<ChatHeader />);
    const pressable = await UNSAFE_getAllByType(Pressable);
    const firstPressable = pressable[0];
    const styleFunction = firstPressable.props.style;

    act(() => {
      const expectedStyle = styleFunction({ pressed: false });
      expect(expectedStyle[0].backgroundColor).toEqual('#0d253f');
    });
  });

  it('on press of pressable go to profileInfo screen', () => {
    const { getByTestId } = render(
      <ChatHeader
        profileImage={'image.png'}
        username={'chandani'}
        userEmail={'chandani@gmail.com'}
        conversationId={'1234'}
        receiverId={'5678'}
        groupName={'RNTeam'}
      />,
    );
    const pressableOfProfileIcon = getByTestId('profileImagePressable');
    fireEvent.press(pressableOfProfileIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('ProfileInfo', {
      profileImage: 'image.png',
      username: 'chandani',
      userEmail: 'chandani@gmail.com',
      conversationId: '1234',
      receiverId: '5678',
      groupName: 'RNTeam',
    });
  });

  it('on press of dots menu', () => {
    const { getByTestId } = render(
      <ChatHeader
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        setIsAttach={setIsAttach}
        setCameraModal={setCameraModal}
      />,
    );
    const dotsMenuIcon = getByTestId('dotsMenu');
    fireEvent.press(dotsMenuIcon);
    expect(setShowMenu).toHaveBeenCalledWith(!showMenu);
    expect(setIsAttach).toHaveBeenCalledWith(false);
    expect(setCameraModal).toHaveBeenCalledWith(false);
  });

  it('should render ChatMenu when showmenu is true', () => {
    const { getByTestId } = render(<ChatHeader showMenu={true} />);
    const chatMenu = getByTestId('chat-menu');
    expect(chatMenu).toBeDefined();
  });
});
