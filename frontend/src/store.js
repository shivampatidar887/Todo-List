import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducers";
import { deletetaskReducer, detailtaskReducer, newtaskReducer, taskReducer } from "./reducers/taskReducer";
const reducer = combineReducers({
     user: userReducer,
     tasks: taskReducer,
     task: detailtaskReducer,
     newTask: newtaskReducer,
     updateTask: deletetaskReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
);
export default store;