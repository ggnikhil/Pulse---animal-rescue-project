const jwt = require("jsonwebtoken")

async function verifyUserMiddleware(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRECT)
    } catch (err) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    req.user = decoded
    next()
}

function scoutOnly(req, res, next) {
    if (req.user.role !== "scout") {
        return res.status(403).json({
            message: "only scouts can access this"
        })
    }
    next()
}

function informerOnly(req, res, next) {
    if (req.user.role !== "informer") {
        return res.status(403).json({
            message: "only informers can access this"
        })
    }
    next()
}

module.exports = { verifyUserMiddleware, scoutOnly, informerOnly }