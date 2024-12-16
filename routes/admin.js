const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

//Signup Endpoint
adminRouter.post("/signup" , async (req , res) => {
    const { email, password, firstName } = req.body;

    //TODO : Zod Validation
    //TODO : Hashing the Password
    //TODO : try-catch block

    await adminModel.create({
        email,
        password,
        firstName
    })

    res.json({
        message: "Signed Up"
    })
});


//Signin Endpoint
adminRouter.post("/signin" , async (req , res) => {
    const { email, password } = req.body;

    //TODO : Compare with the Hashed Passwordv

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SECRET)

        res.json({
            token
        })
    }else{
        res.status(401).json({
            messagwe : "Incorrect Credentials"
        })
    }
})

//Create Courses
adminRouter.post("/" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//Update Course
adminRouter.put("/" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//My purchases Endpoint
adminRouter.get("/bulk" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

module.exports = {
    adminRouter : adminRouter
}