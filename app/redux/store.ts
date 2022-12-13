import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { immutablePersistenceTransform } from '../services';
import { WhatsPopluarReducer } from './popular';

const persistConfig = {
  key: '@moviedb',
  storage: AsyncStorage,
  blacklist: ['nav', 'navigation', 'auth'],
  transforms: [immutablePersistenceTransform],
};

const rootReducer = combineReducers({
  whatsPopular: WhatsPopluarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
