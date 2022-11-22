const jwt = require("jsonwebtoken");

const date = new Date();

function auth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({
            time: date,
            message: "Authentication failed, access denied",
        });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch (error) {
        res.status(400).json({
            time: date,
            message: "Invalid Token",
        });
    }
}
