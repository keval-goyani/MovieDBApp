import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Routes from './navigation/AppNavigation';
import reduxStore from './redux/store';
import { styles } from './theme';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
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
