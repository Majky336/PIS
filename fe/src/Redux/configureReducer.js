import { combineReducers } from 'redux';

import { bookErrorsReducer } from '../components/BookErrors/reducer';
import { errorHistoryReducer } from '../components/ErrorHistory/reducer';
import { bookListsReducer } from '../components/BookList/reducer';
import { errorListsReducer } from '../components/ErrorList/reducer';
import { errorDetailReducer } from '../components/ErrorDetail/reducer';
import { forgottenPasswordReducer } from '../components/ForgottenPassword/reducer';
import { userReducer } from '../components/User/reducer';

export const rootReducer = combineReducers({
  bookErrors: bookErrorsReducer,
  bookList: bookListsReducer,
  errorDetail: errorDetailReducer,
  errorHistory: errorHistoryReducer,
  errorList: errorListsReducer,
  forgottenPassword: forgottenPasswordReducer,
  user: userReducer,
});
