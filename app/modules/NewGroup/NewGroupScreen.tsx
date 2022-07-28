import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Edit from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import {
  CustomFloatingButton,
  EditProfile,
  Header,
  ParticipantsList,
} from '../../components';
import {
  NavigationDataType,
  navigationStrings,
  NewGroupProps,
  strings,
  UserDataType,
} from '../../constants';
import { authDataSelectors } from '../../redux/AuthRedux';
import {
  alertBox,
  conversationIdCreation,
  groupCreation,
  storeImageToStorage,
} from '../../services';
import { Color, Icons, Metrics, moderateScale } from '../../theme';
import { styles } from './styles/NewGroupScreenStyles';

const NewGroupScreen = ({ route }: NewGroupProps) => {
  const navigation: NavigationDataType = useNavigation();
  const [groupName, setGroupName] = useState('');
  const [open, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState(strings.emptyString);
  const [imageUrl, setImageUrl] = useState(strings.emptyString);
  const groupNameInput = useRef<TextInput>(null);
  const [membersInGroup, setMembersInGroup] = useState<UserDataType[]>([]);
  const { user } = useSelector(authDataSelectors.getData);
  const { selectedUser } = route.params;
  const behavior = Metrics.isAndroid ? 'height' : 'padding';

  const chatImageHandler = useCallback(() => {
    if (imagePath) {
      storeImageToStorage({
        imagePath,
        setImagePath,
        setImageUrl,
      });
    }
  }, [imagePath]);

  useEffect(() => {
    chatImageHandler();
  }, [chatImageHandler]);

  const focusHandler = () => {
    groupNameInput && groupNameInput?.current?.focus();
  };

  const createGroup = () => {
    if (groupName === strings.emptyString) {
      alertBox(focusHandler, strings.warning, strings.giveGroupName);
    } else {
      const groupData = [...membersInGroup, user];
      const usersEmail = groupData.map(userDatas => userDatas?.email ?? '');
      const usersId = groupData.map(userDatas => userDatas?.uid ?? '');
      const timeStamp = new Date().getTime().toString();
      const conversationId = conversationIdCreation([...usersEmail, timeStamp]);
      const members = groupData.reduce((previosUserInfo, currentUserInfo) => {
        return {
          ...previosUserInfo,
          [currentUserInfo?.uid ?? '']: currentUserInfo,
        };
      }, {});

      groupCreation({
        conversationId,
        members,
        usersId,
        groupInitializerId: user?.uid ?? '',
        createdBy: user?.username ?? '',
        groupImage: imageUrl,
        groupName,
      });

      navigation.navigate(navigationStrings.Community);
    }
  };

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles.container}>
      <SafeAreaView
        style={styles.container}
        onTouchStart={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Header
            leftIcon={Icons.backIcon}
            logoIcon={Icons.movieDbIcon}
            title={strings.newGroup}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.GroupSubjectContainer}>
            <LinearGradient
              style={styles.linearContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              colors={[
                Color.pistachioDark,
                Color.pistachioMoreDark,
                Color.skyBlue,
                Color.blue,
              ]}>
              <View style={styles.firstContainer}>
                <View style={styles.outerContainer}>
                  <View style={styles.usersContainer}>
                    {imageUrl === strings.emptyString ? (
                      <Image
                        source={Icons.communityIcon}
                        style={styles.defaultGroupIcon}
                      />
                    ) : (
                      <Image
                        style={styles.groupImageStyle}
                        source={{ uri: imageUrl }}
                      />
                    )}
                    <View style={styles.editOuterContainer}>
                      <TouchableOpacity
                        style={styles.editButtonContainer}
                        activeOpacity={0.5}
                        onPress={() => setOpen(true)}>
                        <Edit
                          name={strings.edit}
                          size={moderateScale(16)}
                          color={Color.lightBlue}
                          style={styles.editButton}
                        />
                      </TouchableOpacity>
                      {open && <EditProfile {...{ setOpen, setImagePath }} />}
                    </View>
                  </View>
                </View>
                <View style={styles.GroupDetailsContainer}>
                  <TextInput
                    ref={groupNameInput}
                    placeholder={strings.groupName}
                    placeholderTextColor={Color.transparentDarkBlue}
                    onChangeText={setGroupName}
                    value={groupName}
                    style={styles.textInputStyle}
                  />
                  <Text style={styles.groupDescriptionText}>
                    {strings.groupDetailDescription}
                  </Text>
                </View>
              </View>
              <ParticipantsList
                participantsData={selectedUser ?? []}
                {...{ setMembersInGroup }}
              />
              <CustomFloatingButton
                buttonType={strings.send}
                onPress={createGroup}
                groupButtonStyle={styles.floatingButtonStyle}
              />
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewGroupScreen;
