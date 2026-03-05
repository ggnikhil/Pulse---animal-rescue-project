const express = require("express")
const authRouter = require("./routes/auth.route")
const reportRouter = require("./routes/report.route")
const cookieparser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use("/api/auth",authRouter)
app.use("/api/report",reportRouter)


module.exports = app