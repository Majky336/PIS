import { api } from '../../api/api';

export const USER_FAILURE = 'USER.FAILURE';
export const USER_FETCH = 'USER.FETCH';
export const USER_SUCCESS = 'USER.SUCCESS';
export const USER_RESET = 'USER.RESET';
export const USER_ERROR_RESET = 'USER.ERROR.RESET';

export const userReset = () => ({ type: USER_RESET });

export const userErrorReset = () => ({ type: USER_ERROR_RESET });

export const userFetch = () => ({ type: USER_FETCH });

export const userSuccess = payload => ({
  type: USER_SUCCESS,
  payload,
});

export const userFailure = error => ({
  type: USER_FAILURE,
  error,
});

export const fetchUser = credentials => dispatch => {
  dispatch(userFetch());

  return api.post('/api/login/', credentials).then(
    response => dispatch(userSuccess(response.data)),
    error => dispatch(userFailure(error)),
  );
}

export const resetUser = () => dispatch => {
  dispatch(userReset());
};

export const resetUserError = () => dispatch => {
  dispatch(userErrorReset());
}
