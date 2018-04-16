import { api } from '../../api/api';

export const BOOKLIST_FAILURE = 'BOOKLIST.FAILURE';
export const BOOKLIST_FETCH = 'BOOKLIST.FETCH';
export const BOOKLIST_SUCCESS = 'BOOKLIST.SUCCESS';

export const bookListFetch = () => ({ type: BOOKLIST_FETCH });

export const bookListSuccess = payload => ({
  type: BOOKLIST_SUCCESS,
  payload,
});

export const bookListFailure = error => ({
  type: BOOKLIST_FAILURE,
  error,
});

export const fetchBookList = () => dispatch => {
  dispatch(bookListFetch());

  return api.get('/api/books/').then(
    response => dispatch(bookListSuccess(response.data)),
    error => dispatch(bookListFailure(error)),
  );
}
