import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from '../actions/actionTypes';

const initialState = {
  user: null,
  logged: false,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
      case SIGN_UP_SUCCESS:
      case SIGN_IN_SUCCESS:
          return {
              ...state,
              user: action.user,
              logged: true,
              error: null,
          };
      case SIGN_UP_FAILURE:
      case SIGN_IN_FAILURE:
          return {
              ...state,
              logged: false,
              user: null,
              error: action.error,
          };
      case SIGN_OUT:
          return {
              ...state,
              logged: false,
              user: null,
              error: null,
          };
      default:
          return state;
  }
}

export default authReducer;
