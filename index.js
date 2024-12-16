const express = require("express");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000);
    console.log("Listening....");
}

main();
