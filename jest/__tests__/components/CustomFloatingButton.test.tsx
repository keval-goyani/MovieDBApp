import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Icons } from '../../../app/assets';
import { CustomFloatingButton } from '../../../app/components';

describe('CustomFloatingButton', () => {
  it('should take a snapShot of Custom Floating Button', () => {
    const onpressFn = jest.fn();
    const { toJSON } = render(
      <CustomFloatingButton buttonType={'Plus'} onPress={() => onpressFn} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render plus icon when buttonType prop is Plus', () => {
    const onpressFn = jest.fn();

    const { getByTestId } = render(
      <CustomFloatingButton buttonType={'Plus'} onPress={() => onpressFn} />,
    );
    const plusIcon = getByTestId('plus-icon');
    expect(plusIcon.props.source.testUri).toEqual(Icons.plus.testUri);
  });

  it('should render check icon when buttonType prop is Check', () => {
    const onpressFn = jest.fn();

    const { getByTestId } = render(
      <CustomFloatingButton buttonType={'Check'} onPress={() => onpressFn} />,
    );
    const checkIcon = getByTestId('check-icon');
    expect(checkIcon).toBeDefined();
  });

  it('should call onPress prop when button is pressed', () => {
    const onpressFn = jest.fn();

    const { getByTestId } = render(
      <CustomFloatingButton buttonType={'Check'} onPress={onpressFn} />,
    );
    const button = getByTestId('custom-floating-button');
    fireEvent.press(button);
    expect(onpressFn).toHaveBeenCalled();
  });
});
