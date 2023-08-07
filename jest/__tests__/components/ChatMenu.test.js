import { fireEvent, render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { ChatMenu } from '../../../app/components';
import * as Services from '../../../app/services/Utils';
import { useDispatch } from 'react-redux';

const setShowMenu = jest.fn();
const setChatWallpaper = jest.fn();
const conversationId = 'test-conversation-id';

describe('ChatMenu', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
  });
  it('should take a snapShot of ChatMenu component', () => {
    const { toJSON } = render(<ChatMenu />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call handleGalleryPermission and setShowMenu when change wallpaper button is pressed', () => {
    const { getByText } = render(
      <ChatMenu
        conversationId={conversationId}
        setChatWallpaper={setChatWallpaper}
        setShowMenu={setShowMenu}
      />,
    );
    const changeWallpaperButton = getByText('Change Wallpaper');
    const spy = jest
      .spyOn(Services, 'handleGalleryPermission')
      .mockImplementation();
    fireEvent.press(changeWallpaperButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(setChatWallpaper);
  });

  it('should call the clearChat function from services when clearChat button is pressed', () => {
    const dispatch = useDispatch();
    const { getByText } = render(
      <ChatMenu
        conversationId={conversationId}
        setChatWallpaper={setChatWallpaper}
        setShowMenu={setShowMenu}
      />,
    );
    const clearChatButton = getByText('Clear Chat');
    const spy = jest.spyOn(Services, 'clearChat').mockImplementation();
    fireEvent.press(clearChatButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ setShowMenu, conversationId, dispatch });
  });
});
