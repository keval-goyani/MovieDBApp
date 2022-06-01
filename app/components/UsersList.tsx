import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../assets';
import {
  NavigationDataType,
  navigationStrings,
  strings,
  usersList,
} from '../constants';
import { styles } from './styles/UsersListStyles';

const UsersList = () => {
  const navigation: NavigationDataType = useNavigation();

  const renderUserList = (item: { id: number; email: string; day: string }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate(navigationStrings.Chat)}
        activeOpacity={0.5}>
        <Image source={Icons.avatar} style={styles.avatar} />
        <View style={styles.nameView}>
          <Text style={styles.text}>{item.email}</Text>
          <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
            {strings.lastMesage}
          </Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{item.day}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={usersList}
      renderItem={({ item }) => renderUserList(item)}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default UsersList;
