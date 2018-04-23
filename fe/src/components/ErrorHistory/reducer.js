import {
  ERROR_HISTORY_FETCH,
  ERROR_HISTORY_FAILURE,
  ERROR_HISTORY_SUCCESS,
} from './actions';

const initialState = {
  isFetching: false,
  errorHistory: null,
  error: null,
};

export const errorHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_HISTORY_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case ERROR_HISTORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ERROR_HISTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorHistory: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export const getErrorHistory = state => state.errorHistory;
export const isErrorHistoryFetching = state => state.isFetching;
export const getErrorHistoryError = state => state.error;
