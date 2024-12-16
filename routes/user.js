const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

//Signup Endpoint
userRouter.post("/signup" , async (req , res) => {
    
    res.json({
        message : "Signed Up"
    })
});


//Signin Endpoint
userRouter.post("/signin" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//My purchases Endpoint
userRouter.get("/purchases" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

module.exports = {
    userRouter : userRouter
}

