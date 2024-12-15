const { Router } = require("express");
const adminRouter = Router();

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
adminRouter.post("/course" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//Update Course
adminRouter.put("/course" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//My purchases Endpoint
adminRouter.get("/course/bulk" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

module.exports = {
    adminRouter : adminRouter
}