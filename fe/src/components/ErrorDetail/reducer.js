import {
  ERROR_DETAIL_CREATE,
  ERROR_DETAIL_FAILURE,
  ERROR_DETAIL_SUCCESS,
} from './actions';

const initialState = {
  created: false,
  error: null,
};

export const errorDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_DETAIL_CREATE:
      return {
        ...state,
        created: false,
      };
    case ERROR_DETAIL_FAILURE:
      return {
        ...state,
        created: false,
        error: action.error,
      };
    case ERROR_DETAIL_SUCCESS:
      return {
        ...state,
        created: true,
        error: null,
      };
    default:
      return state;
  }
};

export const isErrorDetailCreated = state => state.created;
export const getErrorDetailError = state => state.error;
