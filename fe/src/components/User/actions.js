import { api } from '../../api/api';

export const USER_FAILURE = 'USER_FAILURE';
export const USER_FETCH = 'USER.FETCH';
export const USER_SUCCESS = 'USER_SUCCESS';

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
    response => {dispatch(userSuccess(response.data)); console.log(response);},
    error => dispatch(userFailure(error)),
  );
}
