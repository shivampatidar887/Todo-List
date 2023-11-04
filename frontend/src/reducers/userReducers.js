
import {
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   CREATE_USER_REQUEST,
   CREATE_USER_SUCCESS,
   CREATE_USER_FAIL,
   DETAIL_USER_REQUEST,
   DETAIL_USER_SUCCESS,
   DETAIL_USER_FAIL,
   LOGOUT_SUCCESS,
   LOGOUT_FAIL,
   CLEAR_ERRORS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case LOGIN_REQUEST:
      case CREATE_USER_REQUEST:
      case DETAIL_USER_REQUEST:
         return {
            loading: true,
            isAuthenticated: false,
         };
      case LOGIN_SUCCESS:
      case CREATE_USER_SUCCESS:
      case DETAIL_USER_SUCCESS:
         return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
         };
      case LOGOUT_SUCCESS:
         return {
            loading: false,
            user: null,
            isAuthenticated: false,
         };
      case LOGOUT_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      case LOGIN_FAIL:
      case CREATE_USER_FAIL:
         return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
         };
      case DETAIL_USER_FAIL:
         return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
         };
      case CLEAR_ERRORS:
         return {
            ...state,
            error: null,
         };
      default:
         return state;
   }
};

