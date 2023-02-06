import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Icons } from '../../../app/assets';
import { Header } from '../../../app/components';

describe('Header', () => {
  it('header component snapshot', () => {
    const { toJSON } = render(<Header />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should be pressed plusButton', () => {
    const { getByTestId } = render(
      <Header
        title="header"
        rightIcon={Icons.movieDbIcon}
        isFromChatMessageScreen={true}
      />,
    );
    const button = getByTestId('button');
    fireEvent.press(button);
  });

  it('should be open search modal', () => {
    const { getByTestId } = render(
      <Header rightIcon={Icons.movieDbIcon} isFromChatMessageScreen={false} />,
    );
    const button = getByTestId('button');
    fireEvent.press(button);
  });
});
