import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Minus from 'react-native-vector-icons/AntDesign';
import {
  NavigationDataType,
  navigationStrings,
  NewGroupDataType,
  NewGroupRenderItemTypes,
  ParticipantsPropsType,
  strings,
  UserDataType,
} from '../constants';
import { Color, moderateScale } from '../theme';
import { ProfileImage } from '../components';
import { styles } from './styles/ParticipantsListStyles';

const ParticipantsList = ({
  participantsData,
  setMembersInGroup,
}: ParticipantsPropsType) => {
  const navigation: NavigationDataType = useNavigation();
  const [participants, setParticipants] = useState<UserDataType[]>([]);
  const selectedUserLength = participants.length;
  const circleHeightWidth =
    selectedUserLength >= 100 ? moderateScale(35) : moderateScale(25);

  const participantsCountContainerStyle = StyleSheet.flatten([
    styles.participantsCountContainer,
    { height: circleHeightWidth, width: circleHeightWidth },
  ]);

  const renderItemHandler = ({ item }: NewGroupRenderItemTypes) => {
    const { username, profileImage } = item;

    const handleOnPress = (deleteItem: NewGroupDataType) => {
      if (participants.includes(deleteItem)) {
        const filteredParticipants = participants.filter(
          (items: NewGroupDataType) => items !== deleteItem,
        );

        if (filteredParticipants.length === 0) {
          navigation.goBack();
          navigation.navigate(navigationStrings.ChatMessage);
        }

        return setParticipants(filteredParticipants);
      }
    };

    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.outerImageContainer}>
          <ProfileImage
            customStyle={styles.avatar}
            userStatus={strings.emptyString}
            {...{ profileImage }}
          />
        </View>
        <Text style={styles.userName} numberOfLines={1}>
          {username}
        </Text>
        <View style={styles.minusButton}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOnPress(item)}>
            <Minus
              name={strings.minusIcon}
              size={moderateScale(14)}
              color={Color.darkBlue}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    setParticipants(participantsData);
  }, [participantsData]);

  useEffect(() => {
    setMembersInGroup(participants);
  }, [participants, setMembersInGroup]);

  return (
    <View style={styles.container}>
      <View style={styles.ParticipantsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.participantsText}>{strings.participants}</Text>
          <View style={participantsCountContainerStyle}>
            <Text style={styles.participantsCount}>{selectedUserLength}</Text>
          </View>
        </View>
        <View style={styles.ProfilesContainer}>
          <FlatList
            data={participants ?? []}
            renderItem={renderItemHandler}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        </View>
      </View>
    </View>
  );
};

export default ParticipantsList;
