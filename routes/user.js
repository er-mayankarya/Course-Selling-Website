const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { JWT_USER_SECRET } = require("../config");
const userRouter = Router();

//Signup Endpoint
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName } = req.body;

    //TODO : Zod Validation
    //TODO : Hashing the Password
    //TODO : try-catch block

    await userModel.create({
        email,
        password,
        firstName
    })

    res.json({
        message: "Signed Up"
    })
});


//Signin Endpoint
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    //TODO : Compare with the Hashed Passwordv

    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_SECRET)

        res.json({
            token
        })
    }else{
        res.status(401).json({
            messagwe : "Incorrect Credentials"
        })
    }
})

//My purchases Endpoint
userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "Signed In"
    })
})

module.exports = {
    userRouter: userRouter
}

