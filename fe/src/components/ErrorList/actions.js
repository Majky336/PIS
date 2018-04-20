import { api } from '../../api/api';

export const ERRORLIST_FAILURE = 'ERRORLIST.FAILURE';
export const ERRORLIST_FETCH = 'ERRORLIST.FETCH';
export const ERRORLIST_SUCCESS = 'ERRORLIST.SUCCESS';

export const errorListFetch = () => ({ type: ERRORLIST_FETCH });

export const errorListSuccess = payload => ({
  type: ERRORLIST_SUCCESS,
  payload,
});

export const errorListFailure = error => ({
  type: ERRORLIST_FAILURE,
  error,
});

export const fetchErrorList = () => dispatch => {
  dispatch(errorListFetch());

  return api.get('/api/errors/').then(
    response => dispatch(errorListSuccess(response.data)),
    error => dispatch(errorListFailure(error)),
  );
}
