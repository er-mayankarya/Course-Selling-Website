const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { userModel, purchaseModel } = require("../db");
const { JWT_USER_SECRET } = require("../config");
const userRouter = Router();
const { userMiddleware } = require("../middleware/user");
const bcrypt = require('bcrypt');

//Signup Endpoint
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName } = req.body;

    const hasedPassword = await bcrypt.hash(password , 5);

    //TODO : Zod Validation
    //TODO : Hashing the Password
    //TODO : try-catch block

    await userModel.create({
        email,
        password : hasedPassword ,
        firstName
    })

    res.json({
        message: "Signed Up"
    })
});


//Signin Endpoint
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    //TODO : Compare with the Hashed Password

    const user = await userModel.findOne({
        email: email,
        
    });

    if (!user) {
        res.status(403).send({
            message : "User doesn't exit in our DB"
        })
    }

    const passwordMatch = await bcrypt.compare(password , user.password);

    if (user && passwordMatch ) {
        const token = jwt.sign({
            id: user._id.toString()
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

