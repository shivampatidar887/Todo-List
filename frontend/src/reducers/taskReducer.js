import {
    ALL_TASK_REQUEST,
    ALL_TASK_SUCCESS,
    ALL_TASK_FAIL,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    NEW_TASK_RESET,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_RESET,
    DELETE_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_RESET,
    UPDATE_TASK_FAIL,
    DETAIL_TASK_REQUEST,
    DETAIL_TASK_SUCCESS,
    DETAIL_TASK_FAIL,
    CLEAR_ERRORS,
} from "../constants/taskConstants";

export const taskReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case ALL_TASK_REQUEST:
            return {
                loading: true,
                tasks: []
            }
        case ALL_TASK_SUCCESS:
            return {
                loading: false,
                tasks: action.payload.tasks,
            }
        case ALL_TASK_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default: return state;
    }
};
export const detailtaskReducer = (state = { task: {} }, action) => {
    switch (action.type) {
        case DETAIL_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DETAIL_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                task: action.payload.task,
            };
        case DETAIL_TASK_FAIL:
            return {
                ...state,
                loading: false,
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

export const newtaskReducer = (state = { task: {} }, action) => {
    switch (action.type) {
        case NEW_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_TASK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                task: action.payload.task,
            }
        case NEW_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_TASK_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default: return state;
    }
};
export const deletetaskReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_TASK_SUCCESS:

            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_TASK_FAIL:
        case UPDATE_TASK_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_TASK_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_TASK_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default: return state;
    }
};

