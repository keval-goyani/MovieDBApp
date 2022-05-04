import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '.';
import rootSaga from '../sagas';
import {immutablePersistenceTransform} from '../services';

const sagaMonitor = undefined;
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middleWare = [sagaMiddleware];

const persistConfig = {
  key: '@moviedb',
  storage: AsyncStorage,
  blacklist: ['nav', 'navigation', 'auth'],
  transforms: [immutablePersistenceTransform],
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(...middleWare);

const enhancers = __DEV__
  ? composeEnhancers(middlewares)
  : compose(middlewares);

const store = createStore(persistedReducer, enhancers);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export default {store, persistor};
