import {
  USER_FETCH,
  USER_FAILURE,
  USER_SUCCESS,
} from './actions';

const initialState = {
  isFetching: false,
  user: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
console.log(action);
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export const getUser = state => state.user;
export const isUserFetching = state => state.isFetching;
export const isUserError = state => state.error;
