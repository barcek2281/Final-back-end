const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access Denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send("Invalid token.");
    }
};

module.exports = authenticateUser;