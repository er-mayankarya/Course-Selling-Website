const { Router } = require("express");
const adminRouter = Router();

const { adminModel } = require("../db");

//Signup Endpoint
adminRouter.post("/signup" , (req , res) => {
    const eamil = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    res.json({
        message : "Signed Up"
    })
});


//Signin Endpoint
adminRouter.post("/signin" , (req , res) => {
    res.json({
        message : "Signed In"
    })
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