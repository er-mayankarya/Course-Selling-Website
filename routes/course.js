const { Router } = require("express");
const courseRouter = Router();

//Get Courses Endpoint
courseRouter.get('/preview' ,(req , res) => {
    res.json({
        message : "Response"
    })
})

// Purchase Courses Endpoint
courseRouter.post("/purchases" , (req , res) => {
    res.json({
        message : ""
    })
})

module.exports = {
    courseRouter : courseRouter
}