import { api } from '../../api/api';

export const USER_FAILURE = 'USER.FAILURE';
export const USER_FETCH = 'USER.FETCH';
export const USER_SUCCESS = 'USER.SUCCESS';
export const USER_RESET = 'USER.RESET';
export const USER_ERROR_RESET = 'USER.ERROR.RESET';
export const USER_UPDATE_POINTS = 'USER.UPDATE.POINTS';
export const USER_UPDATE_POINTS_SUCCESS = 'USER.UPDATE.POINTS.SUCCESS';
export const USER_UPDATE_POINTS_FAILURE = 'USER.UPDATE.POINTS.FAILURE';

const userReset = () => ({ type: USER_RESET });

const userUpdatePoints = () => ({
  type: USER_UPDATE_POINTS,
});

const updatePointsSuccess = payload => ({
  type: USER_UPDATE_POINTS_SUCCESS,
  payload,
});

const updatePointsFailure = error => ({
  type: USER_UPDATE_POINTS_FAILURE,
  error,
});

const userErrorReset = () => ({ type: USER_ERROR_RESET });

const userFetch = () => ({ type: USER_FETCH });

const userSuccess = payload => ({
  type: USER_SUCCESS,
  payload,
});

const userFailure = error => ({
  type: USER_FAILURE,
  error,
});

export const updateUserPoints = (points, userID, noMonths) => dispatch => {
  dispatch(userUpdatePoints());

  return api.post('/api/User/', {
    UserId: userID,
    Points: points,
    NoMonths: noMonths
  }).then(
    response => dispatch(updatePointsSuccess(response.data)),
    error => dispatch(updatePointsFailure(error)),
  );
}

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
