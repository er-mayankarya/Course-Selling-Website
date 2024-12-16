const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware( req , res , next){
    const token = req.header.token;
    const decoded = jwt.verify(token , JWT_ADMIN_SECRET);

    if(decoded){
        req.creatorId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message : "You aren't Signed In"
        })
    }

}

module.exports = {
    adminMiddleware : adminMiddleware
}