import { api } from '../../api/api';

export const ERROR_DETAIL_FAILURE = 'ERROR.DETAIL.FAILURE';
export const ERROR_DETAIL_CREATE= 'ERROR.DETAIL.CREATE';
export const ERROR_DETAIL_SUCCESS = 'ERROR.DETAIL.SUCCESS';

export const errorDetailCreate = () => ({ type: ERROR_DETAIL_CREATE });

export const errorDetailSuccess = payload => ({
  type: ERROR_DETAIL_SUCCESS,
  payload,
});

export const errorDetailFailure = error => ({
  type: ERROR_DETAIL_FAILURE,
  error,
});

export const createErrorDetail = errorDetailList => dispatch => {
  dispatch(errorDetailCreate());

  return api.post('/api/results/', errorDetailList).then(
    response => dispatch(errorDetailSuccess(response.data)),
    error => dispatch(errorDetailFailure(error)),
  );
}
