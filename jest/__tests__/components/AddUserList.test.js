import { navigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from 'p';
import React, { useState } from 'react';
import { AddUsersList } from '../../../app/components';

const data = [
  {
    email: 'chandani@gmail.com',
    username: 'chandani',
  },
  {
    email: 'chandani@gmail.com',
    username: 'chandani3',
  },
];

const data2 = [
  {
    email: 'chandani@gmail.com',
    username: 'chandani',
  },
];

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('AddUserList', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
  });

  it('should take a snapshot of addUserList', () => {
    const { toJSON, debug } = render(
      <AddUsersList userListData={[]} setSelectedUsers={() => jest.fn()} />,
    );
    debug();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call handleOnPress on the onPress and navigate to chat Screen if no item are selected', () => {
    const { getByTestId } = render(
      <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    );
    const button = getByTestId('button-for-test0');
    fireEvent.press(button);
    expect(navigation.goBack).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith('Chat', {
      conversationId: '5ddf976ba364b169e8981460ff50ea8d',
      userEmail: 'chandani@gmail.com',
      username: 'chandani',
    });
  });

  it('should call handleOnPress on the onPress and call the selectUsers if item are selected', () => {
    const someMockOrSpySetter = () => jest.fn();
    const selectUsers = jest.fn();
    useState.mockImplementation(() => [
      [{ email: 'chandani@gmail.com', username: 'chandani2' }],
      someMockOrSpySetter,
    ]);
    const { getByTestId } = render(
      <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    );
    const button = getByTestId('button-for-test0');
    fireEvent.press(button);

    waitFor(() => {
      expect(selectUsers).toHaveBeenCalledWith(data2);
    });
  });

  it('should filter out the selected item list when user longPress the button and user is already present in the selection list', () => {
    const someMockOrSpySetter = () => jest.fn();
    useState.mockImplementation(() => [
      [{ email: 'chandani@gmail.com', username: 'chandani' }],
      someMockOrSpySetter,
    ]);
    const { getByTestId } = render(
      <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    );
    const longPressButton = getByTestId('button-for-test0');
    fireEvent(longPressButton, 'onLongPress');
    waitFor(() => {
      expect(someMockOrSpySetter).toHaveBeenCalledWith([
        { email: 'chandani@gmail.com', username: 'chandani' },
      ]);
    });
  });

  it('should update the selected item list when user longPress the button', () => {
    const someMockOrSpySetter = () => jest.fn();
    useState.mockImplementation(() => [
      [{ email: 'chandani@gmail.com', username: 'chandani2' }],
      someMockOrSpySetter,
    ]);

    const { getByTestId } = render(
      <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    );

    const longPressButton = getByTestId('button-for-test0');
    fireEvent(longPressButton, 'onLongPress');
    waitFor(() => {
      expect(someMockOrSpySetter).toHaveBeenCalledWith([
        { email: 'chandani@gmail.com', username: 'chandani2' },
      ]);
    });
  });

  it('should render the overlay and check button in the userList when user is selected', () => {
    const someMockOrSpySetter = () => jest.fn();
    useState.mockImplementation(() => [
      [{ email: 'chandani@gmail.com', username: 'chandani' }],
      someMockOrSpySetter,
    ]);
    const { queryByTestId } = render(
      <AddUsersList userListData={data2} setSelectedUsers={jest.fn()} />,
    );
    const check = queryByTestId('check');
    expect(check).toBeTruthy();
  });
});
