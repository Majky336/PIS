import { api } from '../../api/api';

export const BOOKERRORS_FAILURE = 'BOOKERRORS.FAILURE';
export const BOOKERRORS_FETCH = 'BOOKERRORS.FETCH';
export const BOOKERRORS_SUCCESS = 'BOOKERRORS.SUCCESS';

export const bookErrorsFetch = () => ({ type: BOOKERRORS_FETCH });

export const bookErrorsSuccess = payload => ({
  type: BOOKERRORS_SUCCESS,
  payload,
});

export const bookErrorsFailure = error => ({
  type: BOOKERRORS_FAILURE,
  error,
});

export const createBookErrors = errors => dispatch => {
  dispatch(bookErrorsFetch());

  return api.post('/api/errors/', errors).then(
    response => dispatch(bookErrorsSuccess(response.data)),
    error => dispatch(bookErrorsFailure(error)),
  );
}
