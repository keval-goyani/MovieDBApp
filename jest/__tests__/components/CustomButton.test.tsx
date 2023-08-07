import { fireEvent, render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { TextStyle } from 'react-native';
import { CustomButton } from '../../../app/components';

describe('CustomBUtton', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
  });

  const buttonStyle = { padding: 5 };
  const buttonTextStyle: TextStyle = { fontSize: 16, fontWeight: 'bold' };
  const buttonText = 'Change Wallpaper';
  const changeWallpaper = jest.fn();
  it('should take a snapshot of CustomBUtton', () => {
    const { toJSON } = render(
      <CustomButton
        buttonTextStyle={buttonTextStyle}
        buttonStyle={buttonStyle}
        buttonText={buttonText}
        onPress={changeWallpaper}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render button with given text', () => {
    const { getByText } = render(
      <CustomButton
        buttonTextStyle={buttonTextStyle}
        buttonStyle={buttonStyle}
        buttonText={buttonText}
        onPress={changeWallpaper}
      />,
    );

    const button = getByText(buttonText);
    expect(button.props.children).toEqual(buttonText);
  });

  it('shpuld call the given function whe button is pressed', () => {
    const { getByTestId } = render(
      <CustomButton
        buttonTextStyle={buttonTextStyle}
        buttonStyle={buttonStyle}
        buttonText={buttonText}
        onPress={changeWallpaper}
      />,
    );

    const button = getByTestId('button');
    fireEvent.press(button);
    expect(changeWallpaper).toHaveBeenCalled();
  });

  it('should apply button style and text style', () => {
    const { getByTestId } = render(
      <CustomButton
        buttonTextStyle={buttonTextStyle}
        buttonStyle={buttonStyle}
        buttonText={buttonText}
        onPress={changeWallpaper}
      />,
    );

    const text = getByTestId('button-text');
    const button = getByTestId('button');
    expect(text.props.style).toEqual(buttonTextStyle);
    expect(button.props.style).toEqual(buttonStyle);
  });
});
