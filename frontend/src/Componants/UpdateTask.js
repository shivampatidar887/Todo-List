import React, { Fragment, useEffect, useState } from "react";
import "./form.css";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_TASK_RESET } from "../constants/taskConstants";
import { useNavigate, useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import LoginSignUp from "./LoginSignup";
import { toast } from "react-toastify"
import { clearErrors, getTaskDetails, updateTask } from "../actions/taskActions";
const Updatetask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const { loading, error, isUpdated } = useSelector((state) => state.updateTask);
    const { isAuthenticated, loading: mloading } = useSelector((state) => state.user);
    const { error:terror, task } = useSelector((state) => state.task);
    
    const [description, setDescription] = useState("");
    useEffect(() => {
        if (terror) {
          toast.error(terror);
          dispatch(clearErrors());
        }
        dispatch(getTaskDetails(id));
      }, [dispatch, error]);
    useEffect(() => {
        if (typeof isAuthenticated === "undefined" && mloading === false) {
            navigate("/")
        }
        if (isAuthenticated === false && mloading === false) {
            navigate("/")
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Task Updated Successfully");
            navigate("/home");
            dispatch({ type: UPDATE_TASK_RESET });
        }
    }, [dispatch, error, navigate, isUpdated,mloading,isAuthenticated]);

    const createTaskSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("description", description);
        dispatch(updateTask(id, myForm));
    };
    useEffect(() => {
        if (task) {
          setDescription(task.description);
        }
      }, [task]);
    return (
        <Fragment>
            {isAuthenticated === true ? (<Fragment>
                <div className="newTaskContainer">
                    <div className="newTaskBox">
                        <form
                            className="createTaskForm"
                            encType="multipart/form-data"
                            onSubmit={createTaskSubmitHandler}
                        >
                            <h1 style={{ color: '#fff' }} >Update Task</h1>
                            <div className="newTaskinpt">
                                <BsPencilSquare />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button
                                id="createTaskBtn"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </Fragment>) : (<LoginSignUp />)}
        </Fragment>
    );
};

export default Updatetask;
