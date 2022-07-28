import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
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
import Users from 'react-native-vector-icons/FontAwesome5';
import Edit from 'react-native-vector-icons/MaterialIcons';
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
import { alertBox } from '../../services';
import { Color, Icons, Metrics, moderateScale } from '../../theme';
import { styles } from './styles/NewGroupScreenStyles';

const NewGroupScreen = ({ route }: NewGroupProps) => {
  const { selectedUser } = route.params;
  const behavior = Metrics.isAndroid ? 'height' : 'padding';
  const navigation: NavigationDataType = useNavigation();
  const [groupName, setGroupName] = useState('');
  const [open, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState(strings.emptyString);
  const groupNameInput = useRef<TextInput>(null);
  const [membersInGroup, setMembersInGroup] = useState<UserDataType[]>([]);

  const focusHandler = () => {
    groupNameInput && groupNameInput?.current?.focus();
  };

  const createGroup = () => {
    groupName === strings.emptyString
      ? alertBox(focusHandler, strings.warning, strings.giveGroupName)
      : navigation.navigate(navigationStrings.Community);
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
                    {imagePath === strings.emptyString ? (
                      <Users
                        name={strings.users}
                        size={moderateScale(33)}
                        color={Color.lightBlue}
                      />
                    ) : (
                      <Image
                        style={styles.groupImageStyle}
                        source={{ uri: imagePath }}
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
