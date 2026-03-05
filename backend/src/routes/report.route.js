const express = require("express")
const multer = require("multer")
const reportController = require("../controller/report.controller")
const { verifyUserMiddleware, informerOnly ,scoutOnly } = require("../middleware/verify.middleware")
const reportRouter = express.Router()

const upload = multer({
    storage:multer.memoryStorage()
})

reportRouter.post("/",upload.single("photo"),verifyUserMiddleware,informerOnly,reportController.createReportController)
reportRouter.get("/allreport", verifyUserMiddleware, reportController.getReportsController)
reportRouter.put("/accept/:id",verifyUserMiddleware,scoutOnly,reportController.acceptReportController);
reportRouter.put("/resolve/:id",verifyUserMiddleware,scoutOnly,reportController.resolveReportController);
reportRouter.get("/myreports", verifyUserMiddleware, informerOnly, reportController.getMyReportsController)

module.exports = reportRouter