import {
  ERRORLIST_FETCH,
  ERRORLIST_FAILURE,
  ERRORLIST_SUCCESS,
} from './actions';

const initialState = {
  isFetching: false,
  errorList: null,
  error: null,
};

export const errorListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERRORLIST_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case ERRORLIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ERRORLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorList: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export const getErrorList = state => state.errorList;
export const isErrorListFetching = state => state.isFetching;
export const getErrorListError = state => state.error;
