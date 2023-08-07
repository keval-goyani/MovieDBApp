import { fireEvent, render } from '@testing-library/react-native';
import { CustomHyperlink } from '../../../app/components';
import React from 'react';

describe('CustomHyperlink', () => {
  const onPressMock = jest.fn();
  const linkTitle = "Don't Have Account?";
  const hyperlinkTitle = 'Create One!';
  it('should take snapshot of customHyperlink', () => {
    const { toJSON } = render(
      <CustomHyperlink
        hyperlinkTitle={hyperlinkTitle}
        linkTitle={linkTitle}
        onPress={onPressMock}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should renders the given linkTitle', () => {
    const { getByText } = render(
      <CustomHyperlink
        hyperlinkTitle={hyperlinkTitle}
        linkTitle={linkTitle}
        onPress={onPressMock}
      />,
    );

    const linkTitleElement = getByText(linkTitle);
    expect(linkTitleElement).toBeDefined();
    expect(linkTitleElement.props.children).toEqual(linkTitle);
  });

  it('should renders the given hyperlinkTitle', () => {
    const { getByText } = render(
      <CustomHyperlink
        hyperlinkTitle={hyperlinkTitle}
        linkTitle={linkTitle}
        onPress={onPressMock}
      />,
    );

    const hyperLinkTitleElement = getByText(hyperlinkTitle);
    expect(hyperLinkTitleElement).toBeDefined();
    expect(hyperLinkTitleElement.props.children).toEqual(hyperlinkTitle);
  });

  it('calls the onPress function when the hyperlink is pressed', () => {
    const { getByText } = render(
      <CustomHyperlink
        hyperlinkTitle={hyperlinkTitle}
        linkTitle={linkTitle}
        onPress={onPressMock}
      />,
    );
    const hyperlinkTitleElement = getByText(hyperlinkTitle);
    fireEvent.press(hyperlinkTitleElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
