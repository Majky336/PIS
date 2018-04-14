import {
  FORGOTTEN_PASSWORD_FETCH,
  FORGOTTEN_PASSWORD_FAILURE,
  FORGOTTEN_PASSWORD_SUCCESS,
} from './actions';

const initialState = {
  isFetching: false,
  error: null,
};

export const forgottenPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOTTEN_PASSWORD_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case FORGOTTEN_PASSWORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FORGOTTEN_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    default:
      return state;
  }
};

export const isForgottenPasswordFetching = state => state.isFetching;
export const isForgottenPasswordError = state => state.error;
