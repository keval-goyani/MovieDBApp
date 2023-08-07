import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import { Attach } from '../../../app/components';
import * as Services from '../../../app/services/Utils';
import { navigation } from '@react-navigation/native';
import { act } from 'react-test-renderer';

const setIsAttach = jest.fn();
const setDocumentData = jest.fn();
const setImagePath = jest.fn();

describe('Attach', () => {
  it('Attach snapShot', () => {
    const { toJSON } = render(<Attach />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('document icon should press', () => {
    const { getByText } = render(
      <Attach setIsAttach={setIsAttach} setDocumentData={setDocumentData} />,
    );
    const documentButton = getByText('Document');

    const spy = jest
      .spyOn(Services, 'handleDocumentPermission')
      .mockImplementation();
    fireEvent.press(documentButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(setDocumentData);
    expect(setIsAttach).toHaveBeenCalledWith(false);
  });

  it('camera icon should press', () => {
    const { getByText } = render(
      <Attach setIsAttach={setIsAttach} setImagePath={setImagePath} />,
    );
    const cameraButton = getByText('Camera');
    const spy = jest
      .spyOn(Services, 'handleCameraPermission')
      .mockImplementation();
    fireEvent.press(cameraButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(setImagePath);
    expect(setIsAttach).toHaveBeenCalledWith(false);
  });

  it('gallery icon should press', () => {
    const { getByText } = render(
      <Attach setIsAttach={setIsAttach} setImagePath={setImagePath} />,
    );
    const galleryButton = getByText('Gallery');
    const spy = jest
      .spyOn(Services, 'handleGalleryPermission')
      .mockImplementation();
    fireEvent.press(galleryButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(setImagePath);
    expect(setIsAttach).toHaveBeenCalledWith(false);
  });

  it('navigates to location screen on map icon press when location is enabled', async () => {
    const { getByText } = render(
      <Attach
        setIsAttach={setIsAttach}
        conversationId={'5ddf976ba364b169e8981460ff50ea8d'}
        username={'chandani'}
        receiverId={'1234'}
      />,
    );
    const locationButton = getByText('Map');
    SystemSetting.isLocationEnabled.mockImplementation(() =>
      Promise.resolve(true),
    );
    fireEvent.press(locationButton);
    waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Location', {
        isFromChat: false,
        conversationId: '5ddf976ba364b169e8981460ff50ea8d',
        receiverId: '1234',
        username: 'chandani',
      });
      expect(setIsAttach).toHaveBeenCalledWith(false);
    });
  });

  it('give alert for turn on location when location is disabled ', () => {
    const { getByText } = render(<Attach />);
    const locationButton = getByText('Map');
    SystemSetting.isLocationEnabled.mockImplementation(() =>
      Promise.resolve(false),
    );
    const spy = jest.spyOn(Alert, 'alert').mockImplementation();
    fireEvent.press(locationButton);
    Alert.alert = jest
      .fn()
      .mockImplementationOnce((t, m, a, o) => a && a[0] && a[0]?.onPress());
    waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should give the alert when SystemSetting.isLocationEnabled is not enable ', () => {
    const { getByText } = render(<Attach />);
    const locationButton = getByText('Map');
    const spy = jest.spyOn(Alert, 'alert').mockImplementation();
    SystemSetting.isLocationEnabled.mockImplementation(() =>
      Promise.reject('error'),
    );
    fireEvent.press(locationButton);
    waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
