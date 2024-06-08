const express = require('express');
const router = express.Router();
const { auth }= require('../../middware/auth')


const userRoute = router;

const { userController } = require("../../controller/index")

//Get Add book 

// Book.get("/", (req,res) => {

// })

//post add book
userRoute.post("/login", userController.Login);
userRoute.post("/signup", userController.Signup);
userRoute.get("/profile",auth, userController.profile)
userRoute.post("/logout", userController.logout)

module.exports = userRoute;