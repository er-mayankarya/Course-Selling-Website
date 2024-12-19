const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { default: mongoose } = require("mongoose");
const { adminMiddleware } = require("../middleware/admin");
const bcrypt = require("bcrypt");

//Signup Endpoint
adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName } = req.body;

  //Hashing the Password
  const hasedPassword = await bcrypt.hash(password , 2);

  //TODO : Zod Validation
  //TODO : try-catch block

  await adminModel.create({
    email,
    password : hasedPassword,
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
  });

  if (!admin) {
    res.status(403).send({
      message: "User doesn't exit in our DB",
    });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (admin && passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN_SECRET
    );

    res.header("token", token);

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
adminRouter.post("/course", adminMiddleware, async (req, res) => {
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
adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const creatorId = req.creatorId;

  const { title, description, price, imageUrl, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: creatorId,
    },
    {
      title,
      description,
      price,
      imageUrl,
    }
  );

  res.json({
    message: "Course Updated",
    courseId: course._id,
  });
});

//My purchases Endpoint
adminRouter.get("/bulk", adminMiddleware, async (req, res) => {
  const creatorId = req.creatorId;

  const courses = await courseModel.find({
    creatorId: creatorId,
  });

  res.json({
    message: "All Courses",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
