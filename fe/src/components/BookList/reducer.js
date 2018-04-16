import {
  BOOKLIST_FETCH,
  BOOKLIST_FAILURE,
  BOOKLIST_SUCCESS,
} from './actions';

const initialState = {
  isFetching: false,
  bookList: null,
  error: null,
};

export const bookListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKLIST_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case BOOKLIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case BOOKLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookList: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export const getBookList = state => state.bookList;
export const isBookListFetching = state => state.isFetching;
export const getBookListError = state => state.error;
