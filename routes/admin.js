const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { default: mongoose } = require("mongoose");
const { adminMiddleware } = require("../middleware/admin")

//Signup Endpoint
adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName } = req.body;

    //TODO : Zod Validation
    //TODO : Hashing the Password
    //TODO : try-catch block

    await adminModel.create({
        email,
        password,
        firstName,
    });

    res.json({
        message: "Signed Up",
    });
});

//Signin Endpoint
adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    //TODO : Compare with the Hashed Passwordv

    const admin = await adminModel.findOne({
        email: email,
        password: password,
    });

    if (admin) {
        const token = jwt.sign(
            {
                id: admin._id,
            },
            JWT_ADMIN_SECRET
        );

        res.json({
            token,
        });
    } else {
        res.status(401).json({
            messagwe: "Incorrect Credentials",
        });
    }
});


//Create Courses
adminRouter.post("/create" , adminMiddleware , async (req , res) => {
    const creatorId = req.creatorId;

    const { title, description, price, imageUrl } = req.body;

    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId,
    });

    res.json({
        message: "Course Created",
        courseId: course._id,
    });
});

//Update Course
adminRouter.put("/update",  adminMiddleware , async (req, res) => {
    const creatorId = req.creatorId;

    const { title, description, price, imageUrl , courseId} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId ,
        creatorId : creatorId
    } ,{
        title,
        description,
        price,
        imageUrl,
    });

    res.json({
        message: "Course Updated",
        courseId: course._id,
    });
});

//My purchases Endpoint
adminRouter.get("/bulk",  adminMiddleware  , async (req , res) => {
    const creatorId = req.creatorId;

    const courses = await courseModel.find({
        creatorId : creatorId
    });

    res.json({
        message: "All Courses",
        courses
    });
});

module.exports = {
    adminRouter: adminRouter
};
