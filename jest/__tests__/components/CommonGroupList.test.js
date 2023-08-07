import { navigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CommonGroupList } from '../../../app/components';

const listOfGroups = [{ groupName: 'RNTeam' }];
const listOfGroups2 = [
  {
    groupName: 'RNTeam',
    conversationId: 'conversationId1',
    profileImage: 'groupImage1',
  },
  {
    groupName: 'MyTeam',
    conversationId: 'conversationId2',
    profileImage: 'groupImage2',
  },
];

const listWithMembers = [{ members: ['chandani', 'keval'] }];

describe('common Group List', () => {
  it('should take snapShot of CommonGroupList component', () => {
    const { toJSON } = render(<CommonGroupList groupList={listOfGroups} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the list correctly ', () => {
    const { getByTestId, getAllByTestId } = render(
      <CommonGroupList groupList={listOfGroups} />,
    );

    const list = getByTestId('Common-Group-List-');
    expect(list).toBeDefined();

    const buttons = getAllByTestId(/button/);
    expect(buttons).toHaveLength(listOfGroups.length);
  });

  it('should correctly generate membersList array', () => {
    const { getByTestId } = render(
      <CommonGroupList groupList={listWithMembers} />,
    );

    const button = getByTestId('button0');
    fireEvent.press(button);
    const { conversationId, groupName, username, profileImage, ...rest } =
      navigation.navigate.mock.calls[0][1];
    console.log(navigation.navigate.mock.calls, '<==navigation.navigate');
    console.log(rest);
    const membersList = Object.values(rest);
    expect(membersList).toEqual(['chandani', 'keval']);
  });

  it('should navigate to chat screen on group item press', () => {
    const { getByTestId } = render(
      <CommonGroupList groupList={listOfGroups2} />,
    );

    const button = getByTestId('button1');
    fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalledWith('Chat', {
      conversationId: listOfGroups2[1].conversationId,
      groupName: listOfGroups2[1].groupName,
      username: listOfGroups2[1].groupName,
      profileImage: listOfGroups2[1].profileImage,
    });
  });
});
