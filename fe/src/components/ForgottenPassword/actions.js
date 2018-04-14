import { api } from '../../api/api';

export const FORGOTTEN_PASSWORD_FAILURE = 'FORGOTTEN.PASSWORD.FAILURE';
export const FORGOTTEN_PASSWORD_FETCH = 'FORGOTTEN.PASSWORD.FETCH';
export const FORGOTTEN_PASSWORD_SUCCESS = 'FORGOTTEN.PASSWORD.SUCCESS';

export const forgottenPasswordFetch = () => ({ type: FORGOTTEN_PASSWORD_FETCH });

export const forgottenPasswordSuccess = payload => ({
  type: FORGOTTEN_PASSWORD_SUCCESS,
  payload,
});

export const forgottenPasswordFailure = error => ({
  type: FORGOTTEN_PASSWORD_FAILURE,
  error,
});

export const sendEmailWithNewPassword = credentials => dispatch => {
  dispatch(forgottenPasswordFetch());

  return api.post('/api/forgottenPassword/', credentials).then(
    response => dispatch(forgottenPasswordSuccess(response.data)),
    error => dispatch(forgottenPasswordFailure(error)),
  );
}
