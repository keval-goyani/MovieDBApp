import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { strings } from '../constants';
import { useNotification } from '../hooks';

const PushNotification = () => {
  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  } = useNotification();

  const handleDisplayNotification = async () => {
    // Display notification
    displayNotification(strings.warning, strings.liveLocationEnded);
  };

  const handleCreateTriggerNotification = () => {
    // Display notification in 3 seconds
    displayTriggerNotification(
      strings.signUpError,
      strings.goToLogin,
      Date.now() + 3000,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.center]}>
        <Button
          title="Display Notification"
          onPress={handleDisplayNotification}
        />
        <Button
          title="Create Trigger Notification"
          onPress={handleCreateTriggerNotification}
        />
        <Button
          title="Cancel All Notifications"
          onPress={cancelAllNotifications}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default PushNotification;
