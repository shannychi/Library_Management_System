const express = require('express');
const router = express.Router();
const { auth }= require('../../middware/auth')
const { LoggedIn} = require('../../middware/loggin')


const userRoute = router;

const { userController } = require("../../controller/index")

//Get Add book 

// Book.get("/", (req,res) => {

// })

//post add book
userRoute.post("/login",userController.Login);
userRoute.get('/role', auth, userController.Role)
userRoute.post("/signup", userController.Signup);
userRoute.get("/profile", auth, userController.profile)
userRoute.post("/logout", userController.logout)

module.exports = userRoute;