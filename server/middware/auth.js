const jwt = require("jsonwebtoken");
const libraryUser = require('../Model/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.userId;
    const role = decoded?.role;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    req.userId = userId;
    req.role = role;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  auth
}