const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../Model/user");
const borrowedBook = require("../Model/borrowedBook");
require("dotenv").config();

module.exports = {
   
  Login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User does not exist, please register" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const userId = user._id;
      const token = await jwt.sign(
        { userId: userId, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      user.token = token;
      delete user._id;

      await User.findByIdAndUpdate(userId, { token: token });

      res.cookie("token", token, {
        httpOnly: true,
        secure:  process.env.NODE_ENV === 'production',
        sameSite: 'None',
        maxAge:1000 * 60 * 60 * 24,
      });
      return res.status(200).json({ message: "Login successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },


  //register
  Signup: async (req, res, next) => {
    try {
      const { email, password, Name, role } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(409)
          .json({ message: "User already exits with this email" });
      }
      const hashedPasssword = await bcrypt.hash(password, 10);

      const newUser = await new User({
        Name,
        email,
        role,
        password: hashedPasssword,
      });
      newUser.save();
      console.log(newUser);

      if (newUser) {
        return res
          .status(201)
          .json({ message: "user created  successfully pls login" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "server error" });
    }
  },

  //get role
  Role: async(req, res) => {
    try{
     const user = await User.findById(req.userId);
     if(!user) {
       return res.status(404).json({
         message: 'user not found'
       })
     }
     res.status(200).json({role: user.role})
    } catch (error) {
     console.error(error);
     res.status(500).json({
       message: 'server error'
     })
    }
 },

  profile: async (req, res, next) => {
    try{
      const userId = req.userId
      const getAllBorrowedBook = await borrowedBook.find({ userId, active: true })
      .sort({ createAt: -1})
      .populate("bookId")
        return  res.status(200).json(getAllBorrowedBook)

    }catch(err) {
      console.log(err)
      res.status(500).json({message: "server error"})
    }
  },

  logout: async (req, res, next) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });
      return res.status(200).json({ message: "You have successfully logged out" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

