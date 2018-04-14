import { combineReducers } from 'redux';

import { userReducer } from '../components/User/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
});
