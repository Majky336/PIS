import {
  BOOKERRORS_CREATE,
  BOOKERRORS_FAILURE,
  BOOKERRORS_SUCCESS,
} from './actions';

const initialState = {
  created: false,
  error: null,
};

export const bookErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKERRORS_CREATE:
      return {
        ...state,
        created: false,
      };
    case BOOKERRORS_FAILURE:
      return {
        ...state,
        created: false,
        error: action.error,
      };
    case BOOKERRORS_SUCCESS:
      return {
        ...state,
        created: true,
        error: null,
      };
    default:
      return state;
  }
};

export const isBookErrorsCreated = state => state.created;
export const getBookErrorsError = state => state.error;
