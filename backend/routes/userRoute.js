const express = require("express");
const { createUser, loginUser, logoutUser, getUserdetails, getUserdetailstoken } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/user/new").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isAuthenticatedUser,getUserdetails);
router.route("/user/:token").get(getUserdetailstoken);

module.exports = router