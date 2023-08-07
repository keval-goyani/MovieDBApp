import { render } from '@testing-library/react-native';
import { CustomProfileCard } from '../../../app/components';
import React from 'react';

describe('custom profile card', () => {
  const props = {
    profileImage: 'http://image.png',
    username: 'chandani',
    isEmail: true,
    userEmail: 'chandani@gmail.com',
    arrayLength: 3,
    groupName: 'RN Team',
  };

  it('should take a snapshot of custom profile card', () => {
    const { toJSON } = render(<CustomProfileCard {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should renders profile image with correct source', () => {
    const { getByTestId } = render(<CustomProfileCard {...props} />);
    const profileImage = getByTestId('profile-image');
    expect(profileImage.props.children[0].props.source.uri).toEqual(
      props.profileImage,
    );
  });

  it('should renders username correctly', () => {
    const { getByText } = render(<CustomProfileCard {...props} />);
    const usernameText = getByText(props.username);
    expect(usernameText).toBeDefined();
  });

  it('should renders user email when isEmail is true', () => {
    const { getByText } = render(<CustomProfileCard {...props} />);
    const userEmailText = getByText(props.userEmail);
    expect(userEmailText).toBeDefined();
  });

  it('should render group text and numberof participants when Email is false', () => {
    const emailProps = {
      ...props,
      isEmail: false,
    };
    const { getByText } = render(<CustomProfileCard {...emailProps} />);
    const groupText = getByText('Group');
    const numberOfParticipants = getByText(`${props.arrayLength}`);
    expect(groupText).toBeDefined();
    expect(numberOfParticipants).toBeDefined();
  });
});
