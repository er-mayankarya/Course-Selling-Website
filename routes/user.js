const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { userModel, purchaseModel } = require("../db");
const { JWT_USER_SECRET } = require("../config");
const userRouter = Router();
const { userMiddleware } = require("../middleware/user");

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

        res.header("token" , token);

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
userRouter.get("/purchases", userMiddleware , async (req, res) => {
    const userId = req.userId;
    
    const purchases = await purchaseModel.find({
        userId
    })

    res.json({
       purchases
    })
})

module.exports = {
    userRouter: userRouter
}

