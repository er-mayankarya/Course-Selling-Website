const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : String ,
    password : String ,
    name : String
});

const adminSchema = new mongoose.Schema({
    email : String ,
    password : String ,
    firstName : String
});

const courseSchema = new mongoose.Schema({
    title : String ,
    description : String ,
    price : Number ,
    imageUrl : String ,
    creatorId : mongoose.Types.ObjectId
});

const purchaseSchema = new mongoose.Schema({
    userId : mongoose.Types.ObjectId  ,
    creatorId : mongoose.Types.ObjectId
});

const userModel = mongoose.model("Users" , userSchema);
const adminModel = mongoose.model("Admins" , adminSchema);
const courseModel = mongoose.model("Courses" , courseSchema);
const purchaseModel = mongoose.model("Purchases" , purchaseSchema);

module.exports = {
    userModel : userModel ,
    adminModel : adminModel ,
    courseModel : courseModel ,
    purchaseModel : purchaseModel
}