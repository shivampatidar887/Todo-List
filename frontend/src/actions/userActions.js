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
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";
const apiUrl = 'http://localhost:4080/api/v1';

//Login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${apiUrl}/login`,
            { email, password },
            config
        );
        localStorage.setItem('token', data.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

// create user
export const create = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${apiUrl}/user/new`,
            { name, email, password },
            config
        );
        localStorage.setItem('token', data.jwt);
        dispatch({ type: CREATE_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: CREATE_USER_FAIL, payload: error.response.data.message, });
    }
};


// get logged in user by token
export const getUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: DETAIL_USER_REQUEST });
        const { data } = await axios.get(`${apiUrl}/user/${token}`);
        dispatch({ type: DETAIL_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: DETAIL_USER_FAIL, payload: error.response.data.message });
    }
};

//Log out user
export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${apiUrl}/logout`);
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

// CLearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};