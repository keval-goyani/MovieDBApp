import { act, fireEvent, render, cleanup } from '@testing-library/react-native';
import React from 'react';
import { AddUsersList } from '../../../app/components';

const data = [
  {
    email: 'chandani@gmail.com',
    username: 'chandani',
  },
  {
    email: 'chandani1@gmail.com',
    username: 'chandani1',
  },
];
const selectedItems = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];
const fetchingUser = jest.fn();
// const cleanup = jest.fn();

const selectUsers = async selectedUser => {
  if (!selectedItems?.includes(selectedUser)) {
    const filteredList = selectedItems?.filter(items => items !== selectedUser);
    return filteredList;
  }
};

describe('AddUserList', () => {
  it('should take a snapshot of addUserList', () => {
    const { toJSON } = render(
      <AddUsersList userListData={[]} setSelectedUsers={jest.fn()} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('on on press button ', () => {
    const { getByTestId } = render(
      <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    );
    const button = getByTestId('button-for-test0');
    fireEvent.press(button);
    // const lengthOfSelectedItems = true;
    // expect(lengthOfSelectedItems).toBe(true);
  });

  it('on long-press button return selectedUser', async () => {
    const initialState = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    React.useState = jest.fn().mockReturnValue([initialState, jest.fn()]);
    const selectedUser = { id: 1, name: 'John' };

    const { getByTestId } = await render(
      <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    );
    const longPressButton = await getByTestId('button-for-test0');
    // fireEvent(longPressButton, 'onLongPress', { email: 'test@example.com' });
    fireEvent(longPressButton, 'onLongPress');
    // fireEvent.longPress(longPressButton);
    act(() => {
      selectUsers(selectedUser);
    });
    expect(selectedItems).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  });

  it('calls fetchingUser when component is focused', async () => {
    // afterEach(cleanup);
    try {
      if (
        render(
          <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
        )
      ) {
        // Access the root element of the test renderer
        const root = render(
          <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
        );
      }
    } catch (error) {
      // Do nothing
    }
    // const { unmount } = render(
    //   <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
    // );
    // unmount();
    await act(async () => {
      render(<AddUsersList userListData={data} setSelectedUsers={jest.fn()} />);
    });
    expect(fetchingUser).toHaveBeenCalledTimes(1);
  });

  // it('on long-press button return filteredList  ', async () => {
  //   const { getByTestId } = await render(
  //     <AddUsersList userListData={data} setSelectedUsers={jest.fn()} />,
  //   );
  //   const longPressButton = await getByTestId('button-for-test0');
  //   fireEvent(longPressButton, 'onLongPress', { email: 'test@example.com' });

  //   const result = selectUsers({ email: 'keval@gmail.com' }).then(() => {
  //     expect(result).toBe(selectedItems);
  //   });
  // });

  // it('should call fetchingUser when screen is focused', async () => {
  // const AddUsersList = () => {
  //   useFocusEffect(
  //     useCallback(() => {
  //       const sub = mockedFetchingUser();
  //       return () => sub;
  //     }, []),
  //   );
  //   return <></>;
  // };
  // await waitFor(() => {
  //   expect(fetchingUser).toHaveBeenCalled();
  // });
  // unmount();
  // act(() => {
  //   unmount();
  // });
  // expect(cleanup).toHaveBeenCalledTimes(0);
  // expect(mockedFetchingUser).toHaveBeenCalledTimes(1);
  // act(() => {
  //   useFocusEffect.mock.calls[0];
  // });
  // expect(fetchingUser).toHaveBeenCalledTimes(1);
  // const useCallbackMock = jest.fn();
  // React.useCallback = jest.fn(() => useCallbackMock);
  render(<AddUsersList userListData={data} setSelectedUsers={jest.fn()} />);
  act(() => {
    fireEvent(document, new FocusEvent('focus'));
    expect(fetchingUser).toHaveBeenCalledTimes(1);
  });
  // });
});
