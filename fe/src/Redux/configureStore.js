import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';

import { rootReducer } from './configureReducer';

const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  undefined,
  componseEnhancers(applyMiddleware(thunk), autoRehydrate()),
);

export const persistor = persistStore(store, {
  whitelist: ['user'],
});

export default store;
