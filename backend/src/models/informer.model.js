const mongoose = require("mongoose")

const informerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: [true, "username is required"],
        trim: true,
    },
    email: {
        type: String,
        unique: [true, "email already taken"],
        required: [true, "email is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    contact: {
        type: Number,
        required: [true, "contact is required"]
    },
    profile: {
        type: String,
        default: "https://ik.imagekit.io/nikhil29/image%20saver.jpg"
    },
    role: {
        type: String,
        default: "informer"
    }
}, {
    timestamps: true
})

const informerModel = mongoose.model("informer", informerSchema)

module.exports = informerModel