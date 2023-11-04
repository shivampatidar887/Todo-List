const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        minlength: [10, "Description must have atleast 10 characters"],
        maxlength: [120, "Description cannot exceed 120 characters"]
    },
    status: {
        type: String,
        required: true,
        default: "active",
    },
    priority: {
        type: String,
        required: true,
        default: "low",
    },
    deadline: {
        type: Date,
        required: [true, "Please Enter Valid Date"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: 'Please enter a valid deadline date.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Task", taskSchema);
