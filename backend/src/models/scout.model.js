const mongoose = require("mongoose")

const scoutSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"this username is already take by the other user"],
        required:["plz enter your username"],
        trim: true,
    },
    email:{
        type:String,
        unique:[true,"this username is already take by the other user"],
        required:[true,"plz enter your username"],
        trim: true,
    },
    password:{
        type:String,
        required:[true,"password is must required"]
    },
    contact:{
        type:Number,
        required:[true,"plz enter your contact"]
    },
    ngo_name:{
        type:String,
        required:[true,"ngo name is must required"]
    },
    ngo_address:{
        type:String,
        required:[true,"ngo address is must required"]
    },
    ngo_lat:{
        type:Number,
        required:[true,"ngo lat is must required"]
    },
    ngo_lon:{
        type:Number,
        required:[true,"ngo lat is must required"]
    },
    profile:{
        type:String,
        default:"https://ik.imagekit.io/nikhil29/image.jpg"
    },
    role: {
        type: String,
        default: "scout"
    }
},{
    timestamps:true
})

const scoutModel = mongoose.model("scout",scoutSchema)

module.exports = scoutModel

