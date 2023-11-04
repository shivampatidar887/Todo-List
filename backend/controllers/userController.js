const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchasyncerror");
const sendToken = require("../middleware/jwtToken");
const jwtDecode = require("jwt-decode");

// create a user 
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
    });
    sendToken(user, 201, res);
});

// Login user 
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Email and Password"
        })
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email and Password"
        })
    }
    const isPasswordmatched = await user.comparePassword(password);
    if (!isPasswordmatched) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email and Password"
        })
    }
    sendToken(user, 200, res);
});

// Log out
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        succes: true,
        message: "Log out successfully",
    })
});

// get login user details
exports.getUserdetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
});

// get user details by token
exports.getUserdetailstoken = catchAsyncErrors(async (req, res, next) => {
    const decodedtoken = jwtDecode(req.params.token);
    const user = await User.findById(decodedtoken.id);
    res.status(200).json({
        success: true,
        user,
    })
});

