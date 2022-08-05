import React from 'react';
import { FlatList, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { asMutable } from 'seamless-immutable';
import {
  ProfileInfoProps,
  ProfileInfoRenderItemProps,
  strings,
} from '../constants';
import { authDataSelectors } from '../redux/AuthRedux';
import CommonGroupCard from './CommonGroupCard';
import { styles } from './styles/ProfileInfoStyles';

const ProfileInfo = ({
  isEmail,
  imageData,
  membersList,
  membersArray,
  groupInitializerId,
  createdBy,
  time,
  date,
  conversationId,
}: ProfileInfoProps) => {
  const { user } = useSelector(authDataSelectors.getData);
  const renderItem = ({ item }: ProfileInfoRenderItemProps) => {
    return (
      <View style={styles.mediaList}>
        <FastImage source={{ uri: item?.content }} style={styles.ImageStyle} />
      </View>
    );
  };

  return (
    <View style={styles.innerContainer}>
      <View style={styles.DetailsContainer}>
        <View style={styles.statusContainer}>
          <View style={styles.statusDetailContainer}>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTextStyle}>
                {isEmail
                  ? strings.status
                  : `${strings.groupText} ${strings.description}`}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              {isEmail ? (
                <Text style={styles.dateContainerCommonTextStyle}>
                  {strings.constantDate}
                </Text>
              ) : (
                <View style={styles.groupCreateDetailsContainer}>
                  <Text style={styles.dateContainerCommonTextStyle}>
                    {strings.createdBy}
                  </Text>
                  <View style={styles.groupCreatorContainer}>
                    <Text style={styles.dateContainerCommonTextStyle}>
                      {user?.uid === groupInitializerId
                        ? strings.you
                        : createdBy}
                      {strings.comma}
                    </Text>
                  </View>
                  <View style={styles.groupCreatedDateContainer}>
                    <Text style={styles.dateContainerCommonTextStyle}>
                      {`${date}${strings.comma}`}
                    </Text>
                  </View>
                  <Text style={styles.dateContainerCommonTextStyle}>
                    {time}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {imageData?.length !== 0 && (
          <>
            <View style={styles.mediaContainer}>
              <View style={styles.mediaHeader}>
                <Text style={styles.mediaTextStyle}>
                  {strings.mediaLinksAndDocs}
                </Text>
                <View style={styles.mediaCountContainer}>
                  <Text style={styles.mediaCount}>{imageData?.length}</Text>
                </View>
              </View>
              <View style={styles.mediaList}>
                <FlatList
                  data={asMutable(imageData)}
                  renderItem={renderItem}
                  horizontal={true}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </>
        )}

        <CommonGroupCard
          {...{
            isEmail,
            membersList,
            membersArray,
            groupInitializerId,
            conversationId,
          }}
        />
      </View>
    </View>
  );
};

export default ProfileInfo;
