const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// this is the endpoint to do jwt verify with the token passed in the authorization header
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    const decode = jwt.verify(token, JWT_SECRET);

    if(decode){
        req.headers.username = decode;
        req.userId = decode.userId; 
        next();
    }
    else{
        res.status(404).json({
            message : "Could not sign you in"
        })
    }
}

module.exports = authMiddleware