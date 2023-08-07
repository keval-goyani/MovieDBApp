import { fireEvent, render } from '@testing-library/react-native';
import { CustomIconRounder } from '../../../app/components';
import React from 'react';
import { Icons } from '../../../app/assets';
 
describe('Custom Icon Rounder', () => {
  const backgroundColor = {
    backgroundColor: 'green',
  };
  const iconName = 'Document';
  const tintColor = {
    tintColor: 'yellow',
  };
  const onPressMock = jest.fn();
  const path = Icons?.fileIcon;
  it('should take snapshot of customIconRounder', () => {
    const { toJSON } = render(
      <CustomIconRounder
        backgroundColor={backgroundColor}
        path={path}
        iconName={iconName}
        tintColor={tintColor}
        onPress={onPressMock}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <CustomIconRounder
        backgroundColor={backgroundColor}
        path={path}
        iconName={iconName}
        tintColor={tintColor}
        onPress={onPressMock}
      />,
    );
    const iconRounderElement = getByTestId('custom-icon-rounder');
    expect(iconRounderElement).toBeDefined();
  });

  it('displays the icon name', () => {
    const { getByText } = render(
      <CustomIconRounder
        backgroundColor={backgroundColor}
        path={path}
        iconName={iconName}
        tintColor={tintColor}
        onPress={onPressMock}
      />,
    );
    const iconNameText = getByText(iconName);
    expect(iconNameText).toBeDefined();
  });

  it('calls onPress when icon is pressed', () => {
    const { getByTestId } = render(
      <CustomIconRounder
        backgroundColor={backgroundColor}
        path={path}
        iconName={iconName}
        tintColor={tintColor}
        onPress={onPressMock}
      />,
    );
    const iconButton = getByTestId('icon-button');
    fireEvent.press(iconButton);
    expect(onPressMock).toHaveBeenCalled();
  });
});
