import { api } from '../../api/api';

export const ERROR_HISTORY_FAILURE = 'ERROR.HISTORY.FAILURE';
export const ERROR_HISTORY_FETCH= 'ERROR.HISTORY.FETCH';
export const ERROR_HISTORY_SUCCESS = 'ERROR.HISTORY.SUCCESS';

export const errorHistoryFetch = () => ({ type: ERROR_HISTORY_FETCH });

export const errorHistorySuccess = payload => ({
  type: ERROR_HISTORY_SUCCESS,
  payload,
});

export const errorHistoryFailure = error => ({
  type: ERROR_HISTORY_FAILURE,
  error,
});

export const fetchErrorHistory = id => dispatch => {
  dispatch(errorHistoryFetch());

  return api.get('/api/UserErrorHistory/', {
    params: {
      userId: id,
    },
  }).then(
    response => dispatch(errorHistorySuccess(response.data)),
    error => dispatch(errorHistoryFailure(error)),
  );
}
