import { combineReducers } from 'redux';

import { userReducer } from '../components/User/reducer';
import { forgottenPasswordReducer } from '../components/ForgottenPassword/reducer';
import { bookListsReducer } from '../components/BookList/reducer';

export const rootReducer = combineReducers({
  bookList: bookListsReducer,
  forgottenPassword: forgottenPasswordReducer,
  user: userReducer,
});
