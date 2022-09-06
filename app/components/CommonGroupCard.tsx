import React from 'react';
import { Text, View } from 'react-native';
import { CommonGroupCardProps, strings } from '../constants';
import CommonGroupList from './CommonGroupList';
import GroupParticipants from './GroupParticipants';
import { styles } from './styles/CommonGroupCardStyles';

const CommonGroupCard = ({
  isEmail,
  membersList,
  membersArray,
  groupInitializerId,
  conversationId,
}: CommonGroupCardProps) => {
  const groupText =
    membersList.length > 1
      ? `${strings.commonGroups}`
      : `${strings.commonGroup}`;
  return (
    <View style={styles.commonGroupContainer}>
      <View style={styles.commonGroupHeader}>
        <Text style={styles.groupCount}>
          {isEmail ? membersList.length : membersArray.length}
        </Text>
        <View style={styles.commonGroupTitle}>
          <Text style={styles.commonGroupText}>
            {isEmail ? groupText : strings.participants}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {isEmail ? (
          <CommonGroupList groupList={membersList} {...{ conversationId }} />
        ) : (
          <GroupParticipants
            groupList={membersArray}
            {...{ groupInitializerId, conversationId }}
          />
        )}
      </View>
    </View>
  );
};

export default CommonGroupCard;
