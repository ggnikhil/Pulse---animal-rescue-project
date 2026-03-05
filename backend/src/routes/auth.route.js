const express = require("express")
const authController = require("../controller/auth.controller")
const { verifyUserMiddleware, scoutOnly, informerOnly } = require("../middleware/verify.middleware")
const authRouter = express.Router()

// scout routes
authRouter.post("/register-scout",authController.scoutRegisterController)
authRouter.post("/login-scout",authController.scoutLoginController)
authRouter.get("/getme-scout",verifyUserMiddleware,scoutOnly,authController.getScoutDetailsController)
authRouter.post("/logout-scout", verifyUserMiddleware, authController.scoutLogoutController)

//informer routes
authRouter.post("/register-informer",authController.informerRegisterController)
authRouter.post("/login-informer",authController.informerLoginController)
authRouter.get("/getme-informer",verifyUserMiddleware,informerOnly,authController.getInformerDetailsController)
authRouter.post("/logout-informer", verifyUserMiddleware, authController.informerLogoutController)

module.exports = authRouter