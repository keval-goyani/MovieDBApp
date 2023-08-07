import { navigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomShareLocationButton } from '../../../app/components';
import * as Services from '../../../app/services/Utils';

describe('Custom Share Location Button', () => {
  const props = {
    isFromChat: false,
    conversationId: 'C12345678',
    latitude: 32.345678,
    longitude: 34.65748,
    receiverId: 'R123444',
  };

  const userData = {
    uid: 'U1234556',
  };

  it('should take snapshot of customShareLocstionButton', () => {
    const { toJSON } = render(<CustomShareLocationButton {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('shpuld render the share location button when isFromChat is false', () => {
    const { getByTestId } = render(<CustomShareLocationButton {...props} />);
    const shareLocationButton = getByTestId('share-location-button');
    expect(shareLocationButton).toBeDefined();
  });

  it('should call shareLocationHandler without senderId and receiverId', () => {
    const spy = jest.spyOn(Services, 'chatCreation');
    const customProps = {
      isFromChat: false,
      conversationId: 'C12345678',
      latitude: 32.345678,
      longitude: 34.65748,
    };

    const { getByTestId } = render(
      <CustomShareLocationButton {...customProps} />,
    );
    const shareLocationButton = getByTestId('share-location-button');
    fireEvent.press(shareLocationButton);
    expect(spy.mock.calls[0][0].senderId).toEqual('');
    expect(spy.mock.calls[0][0].receiverId).toEqual('');
  });

  it('should call shareLocationHandler and  navigate.goBack and call the chatCreation function when shareLocationButton is pressed', async () => {
    const spy = jest.spyOn(Services, 'chatCreation').mockImplementation();

    useSelector.mockReturnValue({
      user: userData,
    });

    const locationMessage = {
      conversationId: props.conversationId,
      senderId: userData.uid,
      receiverId: props.receiverId,
      content: `${props.latitude},${props.longitude}`,
      type: 'Location',
    };

    const { getByTestId } = render(<CustomShareLocationButton {...props} />);
    const shareLocationButton = getByTestId('share-location-button');
    fireEvent.press(shareLocationButton);

    await expect(spy).toHaveBeenCalledWith(locationMessage);
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
