import React, { Fragment, useEffect, useState } from "react";
import "./form.css";
import { useSelector, useDispatch } from "react-redux";
import { NEW_TASK_RESET } from "../constants/taskConstants";
import { useNavigate } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import { FaBalanceScaleRight } from "react-icons/fa";
import { CiCalendarDate} from "react-icons/ci";

import LoginSignUp from "./LoginSignup";
import { toast } from "react-toastify"
import { clearErrors, createTask } from "../actions/taskActions";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Addtask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newTask);
    const { isAuthenticated, user, loading: mloading } = useSelector((state) => state.user);
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState('low');
    const [selectedDate, setSelectedDate] = useState(null);
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };
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
        if (success) {
            toast.success("Task Created Successfully");
            navigate("/home");
            dispatch({ type: NEW_TASK_RESET });
        }
    }, [dispatch, error, navigate, success]);

    const createTaskSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("description", description);
        myForm.set("priority", priority);
        myForm.set("deadline", selectedDate);

        dispatch(createTask(myForm));
    };

    return (
        <Fragment>
            {isAuthenticated === true ? (<Fragment>
                {isAuthenticated === true ? (<Fragment>
                    <div className="newTaskContainer">
                        <div className="newTaskBox">
                            <form
                                className="createTaskForm"
                                encType="multipart/form-data"
                                onSubmit={createTaskSubmitHandler}
                            >
                                <h1 style={{ color: '#fff' }} >Create Task</h1>

                                {/* <div className="newTaskinpt">
                                    <BsPencilSquare />
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div> */}

                                <div className="newTaskinpt">
                                    <TbFileDescription />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="newTaskinpt">
                                    <FaBalanceScaleRight />
                                    <input
                                        type="text"
                                        placeholder="Priority"
                                        required
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    />

                                    <select className="dropdown" onChange={handlePriorityChange}>
                                        <option value="" disabled selected hidden>Set Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="datepick">
                                    <div className="pp">
                                    <CiCalendarDate/>
                                    </div>
                                    
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        placeholderText=" Set Deadline"
                                        dateFormat="MM-dd-yyyy" 
                                    />
                                </div>

                                <button
                                    id="createTaskBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>) : (<LoginSignUp />)}
            </Fragment>) : (<LoginSignUp />)}
        </Fragment>

    );
};

export default Addtask;
