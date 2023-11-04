import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./List.css";
import { clearErrors, deletetask, getTask, updateTask } from '../actions/taskActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginSignUp from './LoginSignup';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.tasks);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isUpdated } = useSelector((state) => state.updateTask);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activebtn, setActivebtn] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleCollapse = (index, id) => {
    setActiveIndex(activeIndex === index ? -1 : index);
    // Check if the task at the given index is 'active' before updating
    if (tasks[index].status === 'active') {
      const newStatus = 'completed'; // Or the desired new status
      // Update the task's status using the updateTask action
      const statusData = new FormData();
      statusData.set('status', newStatus);
      dispatch(updateTask(id, statusData));
      setTimeout(function () {
        toast.success("Marked As Completed");
      }, 300);
    }
  };

  const handleActivebtn = (btn) => {
    setActivebtn(btn);

    if (btn === 1) {
      setFilteredTasks(tasks); // Show all tasks
    } else if (btn === 2) {
      const activeTasks = tasks.filter(task => task.status === "active");
      setFilteredTasks(activeTasks); // Show active tasks
    } else if (btn === 3) {
      const completedTasks = tasks.filter(task => task.status === "completed");
      setFilteredTasks(completedTasks); // Show completed tasks
    }
  };

  const deleteTaskhandler = (Id) => {
    dispatch(deletetask(Id));
    setTimeout(function () {
      dispatch(getTask());
      toast.success("Task Deleted");
    }, 500);
  };

  useEffect(() => {
    if (typeof isAuthenticated === "undefined" && loading === false) {
      navigate("/");
    }
    if (isAuthenticated === false && loading === false) {
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTask());
  }, [dispatch, error, isUpdated]);

  useEffect(() => {
    // Initialize filteredTasks with all tasks when the component mounts
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <Fragment>
      {isAuthenticated === true ? (
        <Fragment>
          <div className="list">
            <div className="header">
              <p>Hello {user.name.split(" ")[0]}! What's in your mind Today?</p>
              <Link to="/task/new">ADD TASK</Link>
            </div>
            <div className="filter">
              <Link className={activebtn === 1 ? "active" : ""} onClick={() => handleActivebtn(1)} to="#">ALL TASKS</Link>
              <Link className={activebtn === 2 ? "active" : ""} onClick={() => handleActivebtn(2)} to="#">ACTIVE</Link>
              <Link className={activebtn === 3 ? "active" : ""} onClick={() => handleActivebtn(3)} to="#">COMPLETED</Link>
            </div>
            <div className='main'>
              {filteredTasks && filteredTasks.map((task, index) => {
                return (
                  <div className="task" key={task._id}>
                    <div className="tit">
                      <div className='titt'>
                        <h2 style={{ fontWeight: 'bold', color: 'red', marginRight: '1vmax' }}>
                          {task.priority.toUpperCase()}
                        </h2>
                        <h2>{task.description}</h2>
                      </div>

                      <div className="last">
                        <h3 id='dead'>{task.deadline.split('T')[0]}</h3>
                        <Link to="#" onClick={() => deleteTaskhandler(task._id)}>
                          <i className="fa fa-trash" style={{ color: 'red' }} aria-hidden="true" title="Delete Task"></i>
                        </Link>
                        <Link to={`/task/${task._id}`}>
                          <i className="fa fa-pencil-square" aria-hidden="true" title="Update Task"></i>
                        </Link>
                        {task.status === 'active' ? (
                          <Link to="#" onClick={() => handleCollapse(index, task._id)}>
                            <i className="fa-regular fa-circle-check" aria-hidden="true" title="Mark as complete"></i>
                          </Link>
                        ) : (
                          <Link to="#" style={{ pointerEvents: 'none' }}>
                            <i className="fa-solid fa-circle-check" aria-hidden="true" title="Task completed"></i>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredTasks.length === 0 && <p id="empty">No tasks found</p>}
            </div>
          </div>
        </Fragment>
      ) : (<LoginSignUp />)}
    </Fragment>
  );
};

export default List;
