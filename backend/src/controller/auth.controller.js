const scoutModel = require("../models/scout.model")
const informerModel = require("../models/informer.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// scout controller
async function scoutRegisterController(req,res){
    const {username,email,password,contact,ngo_name,ngo_address,ngo_lat,ngo_lon,role} = req.body

    const checkUser = await scoutModel.findOne({
        $or:[
            {email},{username}
        ]
    })

    if(checkUser){
        return res.status(409).json({
            message:(checkUser.email === email)? "this email is already taken by the other users" : "this username is already taken by the other users"
        })
    }

    const hash = await bcryptjs.hash(password,10)

    const user = await scoutModel.create({
        username,
        email,
        password:hash,
        contact,
        ngo_name,
        ngo_address,
        ngo_lat,
        ngo_lon,
        role
    })

    const token = jwt.sign(
        {
            id:user._id,
            user:user.username,
            role:user.role
        },
        process.env.JWT_SECRECT,
        {expiresIn:"7d"}
    )

    res.cookie("token",token,{
        sameSite: "lax"
    })

    res.status(201).json({
        message:"user register successfully",
        user
    })
}

async function scoutLoginController(req,res){
    const {email,username,password} = req.body

    const checkUser = await scoutModel.findOne({
        $or:[
            {email},{username}
        ]
    })

    if(!checkUser){
        return res.status(409).json({
            message:email? "invalid email" :"invalid username"
        })
    }

    const checkPassword = await bcryptjs.compare(password,checkUser.password)

    if(!checkPassword){
        res.status(409).json({
            message:"invalid password"
        })
    }


    const token = jwt.sign(
        {
            id:checkUser._id,
            username:checkUser.username,
            role: checkUser.role
        },
        process.env.JWT_SECRECT,
        {
            expiresIn:"7d"
        }
    )

    res.cookie("token",token,{
        sameSite: "lax"
    })

    res.status(200).json({
        message:"user login successfully",
        user:{
            username:checkUser.username,
            email:checkUser.email,
            contact:checkUser.contact,
            ngo_name:checkUser.ngo_name,
            ngo_address:checkUser.ngo_address,
            ngo_lat:checkUser.ngo_lat,
            ngo_lon:checkUser.ngo_lon,
        },
        token
    })

}

async function scoutLogoutController(req,res){
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully" })
}

async function getScoutDetailsController(req,res){
    const userScout = await scoutModel.findById(req.user.id)

    console.log(userScout)

    res.status(200).json({
        message:"Scout details fetch successfully",
        details:{
            username:userScout.username,
            email:userScout.email,
            contact:userScout.contact,
            ngo_name:userScout.ngo_name,
            ngo_address:userScout.ngo_address,
            ngo_lat:userScout.ngo_lat,
            ngo_lon:userScout.ngo_lon,
            role:userScout.role,
            profile:userScout.profile
        }
    })
}

//informer controller
async function informerRegisterController(req,res){
    const { username, email, password, contact,role } = req.body

    const checkUser = await informerModel.findOne({
        $or: [{ email }, { username }]
    })

    if (checkUser) {
        return res.status(409).json({
            message: (checkUser.email === email) ? "this email is already taken" : "this username is already taken"
        })
    }

    const hash = await bcryptjs.hash(password, 10)

    const user = await informerModel.create({
        username,
        email,
        password: hash,
        contact,
    })

    const token = jwt.sign(
        { id: user._id, username: user.username,role:user.role },
        process.env.JWT_SECRECT,
        { expiresIn: "7d" }
    )

    res.cookie("token", token,{
        sameSite: "lax"
    })

    res.status(201).json({
        message: "informer registered successfully",
        user
    })
}

async function informerLoginController(req,res){
    const { email, username, password } = req.body

    const checkUser = await informerModel.findOne({
        $or: [{ email }, { username }]
    })

    if (!checkUser) {
        return res.status(409).json({
            message: email ? "invalid email" : "invalid username"
        })
    }

    const checkPassword = await bcryptjs.compare(password, checkUser.password)

    if (!checkPassword) {
        return res.status(409).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign(
        { id: checkUser._id, username: checkUser.username,role: checkUser.role },
        process.env.JWT_SECRECT,
        { expiresIn: "7d" }
    )

    res.cookie("token", token,{
        sameSite: "lax"
    })

    res.status(200).json({
        message: "informer login successfully",
        user: {
            username: checkUser.username,
            email: checkUser.email,
            contact: checkUser.contact,
        },
        token
    })
}

async function informerLogoutController(req,res){
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully" })
}

async function getInformerDetailsController(req,res){
    const informer = await informerModel.findById(req.user.id)

    res.status(200).json({
        message: "Informer details fetch successfully",
        details: {
            username: informer.username,
            email: informer.email,
            contact: informer.contact,
            profile:informer.profile,
            role:informer.role
        }
    })
}



module.exports = {
    scoutRegisterController,
    scoutLoginController,
    getScoutDetailsController,
    scoutLogoutController,

    informerLoginController,
    informerRegisterController,
    getInformerDetailsController,
    informerLogoutController
}