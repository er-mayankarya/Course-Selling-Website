const { Router } = require("express");

const userRouter = Router();

//Signup Endpoint
userRouter.post("/signup" , (req , res) => {
    const eamil = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

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

