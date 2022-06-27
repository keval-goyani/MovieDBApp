import notifee, {
  AuthorizationStatus,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { Alert } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { strings } from '../constants';

export const useNotification = () => {
  async function displayNotification(title: string, body: string) {
    const channelId = await notifee.createChannel({
      id: 'movieDB',
      name: 'Movie DB App',
    });

    const settings = await notifee.getNotificationSettings();

    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      Alert.alert(strings.notificationBlocked, strings.grantPermission, [
        { onPress: () => openSettings(), text: strings.goToSettings },
        { text: strings.cancel },
      ]);
    } else {
      await notifee.requestPermission();
    }

    const notificationId = notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        showTimestamp: true,
      },
    });
    return notificationId;
  }

  async function displayTriggerNotification(
    title: string,
    body: string,
    timestamp: number,
    repeatFrequency?: RepeatFrequency,
  ) {
    const channelId = await notifee.createChannel({
      id: 'movieDB',
      name: 'Movie DB Channel',
    });

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: timestamp,
      repeatFrequency: repeatFrequency,
    };

    const triggerNotificationId = await notifee.createTriggerNotification(
      {
        title: title,
        body: body,
        android: {
          channelId,
        },
      },
      trigger,
    );
    return triggerNotificationId;
  }

  async function getTriggerNotificationIds() {
    const triggerNotificationIds = await notifee.getTriggerNotificationIds();
    return triggerNotificationIds;
  }

  async function cancelTriggerNotifications(notificationIds?: string[]) {
    await notifee.cancelTriggerNotifications(notificationIds);
  }

  async function cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }

  async function cancelNotification(notificationId: string, tag?: string) {
    await notifee.cancelNotification(notificationId, tag);
  }

  return {
    displayNotification,
    displayTriggerNotification,
    getTriggerNotificationIds,
    cancelTriggerNotifications,
    cancelAllNotifications,
    cancelNotification,
  };
};
