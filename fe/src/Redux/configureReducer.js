import { combineReducers } from 'redux';

import { userReducer } from '../components/User/reducer';
import { forgottenPasswordReducer } from '../components/ForgottenPassword/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  forgottenPassword: forgottenPasswordReducer,
});
