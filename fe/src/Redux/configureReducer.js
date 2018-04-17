import { combineReducers } from 'redux';

import { bookErrorsReducer } from '../components/BookErrors/reducer';
import { bookListsReducer } from '../components/BookList/reducer';
import { forgottenPasswordReducer } from '../components/ForgottenPassword/reducer';
import { userReducer } from '../components/User/reducer';

export const rootReducer = combineReducers({
  bookErrors: bookErrorsReducer,
  bookList: bookListsReducer,
  forgottenPassword: forgottenPasswordReducer,
  user: userReducer,
});
