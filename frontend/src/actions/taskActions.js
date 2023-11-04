import axios from "axios";
import {
    ALL_TASK_REQUEST,
    ALL_TASK_SUCCESS,
    ALL_TASK_FAIL,
    DETAIL_TASK_REQUEST,
    DETAIL_TASK_SUCCESS,
    DETAIL_TASK_FAIL,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_RESET,
    CLEAR_ERRORS,
} from "../constants/taskConstants";
const apiUrl = 'http://localhost:4080/api/v1';

export const getTask = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_TASK_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${apiUrl}/my/tasks`, config);
        dispatch({
            type: ALL_TASK_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_TASK_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getTaskDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: DETAIL_TASK_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${apiUrl}/task/${id}`, config);
        dispatch({
            type: DETAIL_TASK_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DETAIL_TASK_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Create new task
export const createTask = (taskData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_TASK_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
        const { data } = await axios.post(`${apiUrl}/task/new`, taskData, config);

        dispatch({ type: NEW_TASK_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: NEW_TASK_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Update task
export const updateTask = (id, taskData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TASK_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
        const { data } = await axios.put(`${apiUrl}/task/${id}`, taskData, config);

        dispatch({ type: UPDATE_TASK_SUCCESS, payload: data.success })
        setTimeout(() => {
            dispatch({ type: UPDATE_TASK_RESET });
        }, 6000); // 5000 milliseconds (5 seconds)
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAIL,
            payload: error.response.data.message
        });
    }
};

//Delete task
export const deletetask = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TASK_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.delete(`${apiUrl}/task/${id}`, config);
        dispatch({ type: DELETE_TASK_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAIL,
            payload: error.response.data.message,
        });
    }
};

// CLearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};