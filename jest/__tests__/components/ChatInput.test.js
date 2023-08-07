import { fireEvent, render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { ChatInput } from '../../../app/components';
import { Keyboard } from 'react-native';

const setCameraModal = jest.fn();
const setIsAttach = jest.fn();
const setShowMenu = jest.fn();
Keyboard.dismiss = jest.fn();
const isAttach = true;
const cameraModal = true;

const documentData = {
  documentName: 'abd',
  documentUrl: 'http://document.location.',
};

describe('ChatInpur', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
  });

  it('take SnapShot of chatInput', () => {
    const { toJSON } = render(<ChatInput />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should setMessage on onchangeText', () => {
    const { getByTestId } = render(<ChatInput />);
    const textInput = getByTestId('textInput');
    fireEvent.changeText(textInput, 'chandani');
    expect(textInput.props.value).toBe('chandani');
  });

  it('should setcamera modal and isAttach on onfocus', () => {
    const { getByTestId } = render(
      <ChatInput setCameraModal={setCameraModal} setIsAttach={setIsAttach} />,
    );
    const textInput = getByTestId('textInput');
    fireEvent(textInput, 'onFocus');
    expect(setCameraModal).toHaveBeenCalledWith(false);
    expect(setIsAttach).toHaveBeenCalledWith(false);
  });

  it('OnPress event of Attach icon', () => {
    const { getByTestId } = render(
      <ChatInput
        setCameraModal={setCameraModal}
        setIsAttach={setIsAttach}
        setShowMenu={setShowMenu}
        isAttach={isAttach}
      />,
    );
    const atttachIcon = getByTestId('AttachIcon');
    fireEvent.press(atttachIcon);
    expect(setCameraModal).toHaveBeenCalledWith(false);
    expect(setShowMenu).toHaveBeenCalledWith(false);
    expect(setIsAttach).toHaveBeenCalledWith(!isAttach);
    expect(Keyboard.dismiss).toHaveBeenCalled();
  });

  it('OnPress event of Camera', () => {
    const { getByTestId } = render(
      <ChatInput
        setCameraModal={setCameraModal}
        setIsAttach={setIsAttach}
        setShowMenu={setShowMenu}
        cameraModal={cameraModal}
      />,
    );
    const cameraIcon = getByTestId('CameraIcon');
    fireEvent.press(cameraIcon);
    expect(setCameraModal).toHaveBeenCalledWith(!cameraModal);
    expect(setIsAttach).toHaveBeenCalledWith(false);
    expect(setShowMenu).toHaveBeenCalledWith(false);
    expect(Keyboard.dismiss).toHaveBeenCalled();
  });

  it('Onpress of send Button', () => {
    const { getByTestId } = render(
      <ChatInput
        setCameraModal={setCameraModal}
        setIsAttach={setIsAttach}
        setShowMenu={setShowMenu}
        imageUrl="chandani.png"
        documentData={documentData}
      />,
    );
    const sendButton = getByTestId('sendButton');
    fireEvent.press(sendButton);
    expect(setCameraModal).toHaveBeenCalledWith(false);
    expect(setIsAttach).toHaveBeenCalledWith(false);
    expect(setShowMenu).toHaveBeenCalledWith(false);
  });

  it('should send message when is there', () => {
    const { getByTestId } = render(
      <ChatInput
        setCameraModal={setCameraModal}
        setIsAttach={setIsAttach}
        setShowMenu={setShowMenu}
      />,
    );
    const textInput = getByTestId('textInput');
    fireEvent.changeText(textInput, 'chandani');
    expect(textInput.props.value).toBe('chandani');
    const sendButton = getByTestId('sendButton');
    fireEvent.press(sendButton);
    expect(setIsAttach).toHaveBeenCalled();
  });
});
