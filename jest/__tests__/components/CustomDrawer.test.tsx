import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../../app/assets';
import { CustomDrawer } from '../../../app/components';
import selectedAction from '../../../app/redux/DrawerSelectRedux';
import reduxStore from '../../../app/redux/store';
import { handleLogOut } from '../../../app/services';

describe('Custom Drawer', () => {
  const setActiveTabMock = { payload: 'Home', type: 'SELECTED' };
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
    useSelector.mockReturnValue({
      setActiveTab: setActiveTabMock,
    });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  const navigation = useNavigation();
  it('should take snapshot of Custom Drawer', () => {
    const { toJSON } = render(<CustomDrawer navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render profileImage when user have profileImage set', () => {
    const setActiveTabMocks = { payload: 'Home', type: 'SELECTED' };
    const userData = { profileImage: 'http://image.com' };

    useSelector.mockReturnValue({
      setActiveTab: setActiveTabMocks,
      user: userData,
    });
    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);

    expect(getByTestId('user-image')).toBeDefined();
  });

  it('should render defaultProfile image when user has not set the profileImage', () => {
    const setActiveTabMocks = { payload: 'Home', type: 'SELECTED' };
    const userData = { username: 'chandnai' };

    useSelector.mockReturnValue({
      setActiveTab: setActiveTabMocks,
      user: userData,
    });
    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);
    expect(getByTestId('default-profile-image')).toBeDefined();
  });

  it('should render the edit profile button', () => {
    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);
    expect(getByTestId('edit-profile')).toBeDefined();
  });

  it('should open EditProfile modal on clicking Edit Profile button', () => {
    const setIsOpen = jest.fn();
    const setImagePath = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy
      .mockImplementationOnce(() => [true, setIsOpen])
      .mockImplementationOnce(() => [true, setIsOpen])
      .mockImplementationOnce(() => ['http://image.com', setImagePath]);


    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);
    const EditProfileButton = getByTestId('edit-profile');
    fireEvent.press(EditProfileButton);
    expect(getByTestId('edit-profile-modal')).toBeDefined();
  });

  it('should navigate to home screen on clicking to Home drawer item and icon should be There', () => {
    const dispatch = useDispatch();
    const { container, debug } = render(
      <CustomDrawer navigation={navigation} />,
    );
    debug();
    console.log(debug(), '<==debug');

    const drawerItem = container.findAllByType(DrawerItem);
    const homeDrawerItem = drawerItem.find(item => item.props.label === 'Home');
    fireEvent.press(homeDrawerItem);
    expect(dispatch).toHaveBeenCalledWith(selectedAction.selected('Home'));
    expect(navigation.navigate).toHaveBeenCalledWith('TabRoot', {
      screen: 'Home',
    });

    const homeIcon = drawerItem
      .find(item => item.props.label === 'Home')
      ?.props.icon();

    expect(homeIcon.props.source).toBeTruthy();
    expect(homeIcon.props.source.testUri).toBe(Icons.homeIcon.testUri);
  });

  it('should navigate to Trailers screen on clicking to Trending drawer item icon should be There', () => {
    const dispatch = useDispatch();
    const { container } = render(<CustomDrawer navigation={navigation} />);

    const drawerItem = container.findAllByType(DrawerItem);
    const trendingDrawerItem = drawerItem.find(
      item => item.props.label === 'Trending',
    );
    fireEvent.press(trendingDrawerItem);
    expect(dispatch).toHaveBeenCalledWith(selectedAction.selected('Trailers'));
    expect(navigation.navigate).toHaveBeenCalledWith('TabRoot', {
      screen: 'Trailers',
    });

    const trendingIcon = drawerItem
      .find(item => item.props.label === 'Trending')
      ?.props.icon();

    expect(trendingIcon.props.source).toBeTruthy();
    expect(trendingIcon.props.source.testUri).toEqual(Icons.trending.testUri);
  });

  it('should navigate to Movies screen on clicking to Movies drawer item and Icon should be there', () => {
    const dispatch = useDispatch();
    const { container } = render(<CustomDrawer navigation={navigation} />);

    const drawerItem = container.findAllByType(DrawerItem);
    const moviesDrawerItem = drawerItem.find(
      item => item.props.label === 'Movies',
    );
    fireEvent.press(moviesDrawerItem);
    expect(dispatch).toHaveBeenCalledWith(selectedAction.selected('Movies'));
    expect(navigation.navigate).toHaveBeenCalledWith('TabRoot', {
      screen: 'Movies',
    });

    const moviesIcon = drawerItem
      .find(item => item.props.label === 'Movies')
      ?.props.icon();

    expect(moviesIcon.props.source).toBeTruthy();
    expect(moviesIcon.props.source.testUri).toEqual(Icons.moviesIcon.testUri);
  });

  it('should just call onPress Function clicking to TV Shows drawer item and Icon should be there', () => {
    const { container } = render(<CustomDrawer navigation={navigation} />);

    const drawerItem = container.findAllByType(DrawerItem);
    const tvShowsDrawerItem = drawerItem.find(
      item => item.props.label === 'TV Shows',
    );
    fireEvent.press(tvShowsDrawerItem);

    const tvShowsIcon = drawerItem
      .find(item => item.props.label === 'TV Shows')
      ?.props.icon();

    expect(tvShowsIcon.props.source).toBeTruthy();
    expect(tvShowsIcon.props.source.testUri).toEqual(Icons.tv.testUri);
  });

  it('should navigate to Community screen on clicking to People drawer item', () => {
    const dispatch = useDispatch();
    const { container } = render(<CustomDrawer navigation={navigation} />);

    const drawerItem = container.findAllByType(DrawerItem);
    const peopleDrawerItem = drawerItem.find(
      item => item.props.label === 'People',
    );
    fireEvent.press(peopleDrawerItem);
    expect(dispatch).toHaveBeenCalledWith(selectedAction.selected('Community'));
    expect(navigation.navigate).toHaveBeenCalledWith('TabRoot', {
      screen: 'Community',
    });

    const communityIcon = drawerItem
      .find(item => item.props.label === 'People')
      ?.props.icon();

    expect(communityIcon.props.source).toBeTruthy();
    expect(communityIcon.props.source.uri).toBe(Icons?.communityIcon.uri);
  });

  it('should popUp Alert on pressing the Logout button', () => {
    const dispatch = useDispatch();
    const { persistor } = reduxStore;

    const spy = jest.spyOn(Alert, 'alert').mockImplementation();
    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);
    const logoutBUtton = getByTestId('logout-button');
    fireEvent.press(logoutBUtton);

    expect(spy).toHaveBeenCalledWith('Warning', 'Confirm Logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: handleLogOut({ dispatch, persistor }),
      },
    ]);
  });

  it('should call onPressIn with selected style', () => {
    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);
    const logoutBUtton = getByTestId('logout-button');

    fireEvent(logoutBUtton, 'onPressIn');
    expect(logoutBUtton.props.style.backgroundColor).toEqual('#32d9cb');
  });

  it('should call onPressOut with selected style', () => {
    const { getByTestId } = render(<CustomDrawer navigation={navigation} />);
    const logoutBUtton = getByTestId('logout-button');

    fireEvent(logoutBUtton, 'onPressOut');
    expect(logoutBUtton.props.style.backgroundColor).toEqual('#0d253f');
  });
});
