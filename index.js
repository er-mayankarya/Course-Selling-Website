const express = require("express");
const app = express();

app.use(express.json());


//Signup Endpoint
app.post("/users/signup" , (req , res) => {
    const eamil = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    res.json({
        message : "Signed Up"
    })
});


//Signin Endpoint
app.post("/users/signin" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//My purchases Endpoint
app.get("/users/purchases" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})

//Get Courses Endpoint
app.get('/courses' ,(req , res) => {
    res.json({
        message : "Response"
    })
})

// Purchase Courses Endpoint
app.post("/courses/purchases" , (req , res) => {
    res.json({
        message : "Signed In"
    })
})



app.listen(3000);