const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { courseModel, purchaseModel } = require("../db");
const courseRouter = Router();

//Get Courses Endpoint
courseRouter.get('/preview' , async (req , res) => {

    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

// Purchase Courses Endpoint
courseRouter.post("/purchases" , userMiddleware , async (req , res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId ,
        courseId
    })
    res.json({
        message : "You have sucessfully bought the course"
    })
})

module.exports = {
    courseRouter : courseRouter
}