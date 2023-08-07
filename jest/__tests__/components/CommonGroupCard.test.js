import { render } from '@testing-library/react-native';
import React from 'react';
import { CommonGroupCard } from '../../../app/components';

const membersArray = ['chandani', 'keval', 'harsh', 'het'];
const membersList = ['chandani', 'keval', 'harsh', 'het'];
const membersListForOnlyOne = ['chandani'];

const onlyOneMember = ['chandani'];

describe('common Group Card', () => {
  it('should take snapShot of CommonGroupCard component', () => {
    const { toJSON } = render(
      <CommonGroupCard membersArray={membersArray} membersList={membersList} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the correct groupCount when email is there', () => {
    const { getByText } = render(
      <CommonGroupCard
        membersArray={membersArray}
        membersList={membersList}
        isEmail={true}
      />,
    );
    expect(getByText(membersList.length.toString())).toBeDefined();
  });

  it('renders the correct groupCount when email is not there', () => {
    const { getByText } = render(
      <CommonGroupCard
        membersArray={membersArray}
        membersList={membersList}
        isEmail={false}
      />,
    );
    expect(getByText(membersArray.length.toString())).toBeDefined();
  });

  it('should render the commonGroup text in groupcard when membersList length is more than one ', () => {
    const { getByText } = render(
      <CommonGroupCard
        membersArray={membersArray}
        membersList={membersList}
        isEmail={true}
      />,
    );

    const GroupsInCommon = getByText('Groups in common');
    expect(GroupsInCommon).toBeDefined();
  });

  it('should render the commonGroup text in groupCard when membersList length is not more than one', () => {
    const { getByText } = render(
      <CommonGroupCard
        membersArray={membersArray}
        membersList={membersListForOnlyOne}
        isEmail={true}
      />,
    );

    const GroupInCommon = getByText('Group in common');
    expect(GroupInCommon).toBeDefined();
  });

  it('should render participants text in group card when there is no email', () => {
    const { getByText } = render(
      <CommonGroupCard
        membersArray={membersArray}
        membersList={membersListForOnlyOne}
        isEmail={false}
      />,
    );

    const Participants = getByText('Participants');
    expect(Participants).toBeDefined();
  });

  it('should render CommonGroupList component if there is email', () => {
    const { getByTestId } = render(
      <CommonGroupCard
        membersArray={membersArray}
        membersList={membersListForOnlyOne}
        isEmail={true}
      />,
    );

    const commonGroupList = getByTestId('Common-Group-List');
    expect(commonGroupList).toBeDefined();
  });

  it('should render GroupParticipants component if there is no email', () => {
    const { getByTestId } = render(
      <CommonGroupCard
        membersArray={onlyOneMember}
        membersList={membersListForOnlyOne}
        isEmail={false}
      />,
    );

    const groupPartcipants = getByTestId('Group-Participants');
    expect(groupPartcipants).toBeDefined();
  });
});
