const express = require("express");

const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllTasks, createTask, updateTask, deleteTask, getTasksDetails } = require("../controllers/taskController");
const router = express.Router();

router.route("/task/new").post(isAuthenticatedUser, createTask);
router.route("/my/tasks").get(isAuthenticatedUser, getAllTasks);
router.route("/task/:id").put(isAuthenticatedUser, updateTask).delete(isAuthenticatedUser, deleteTask).get(isAuthenticatedUser, getTasksDetails);
module.exports = router