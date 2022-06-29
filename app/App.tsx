import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Routes } from './navigation';
import reduxStore from './redux/store';
import { styles } from './theme';
import notifee from '@notifee/react-native';
import icons from './assets/icons';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     console.log('when app is in quit state', remoteMessage);

    //   });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const { body, title } = remoteMessage.notification;
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      await notifee.displayNotification({
        title: title,
        body: body,

        android: {
          channelId,
          // largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher',
          timestamp: Date.now(),
          showTimestamp: true,
          pressAction: {
            id: 'default',
          },
        },
      });
      console.log(remoteMessage, '<=========remoteMessage');
    });

    messaging().onMessage(async remoteMessage => {
      const { body, title } = remoteMessage.notification;
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      await notifee.displayNotification({
        title: title,
        body: body,

        android: {
          channelId,
          timestamp: Date.now(),
          showTimestamp: true,
          pressAction: {
            id: 'default',
          },
        },
      });
    });
  }, []);

  const { store, persistor } = reduxStore;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
