const jwt = require("jsonwebtoken");
const libraryUser = require("../Model/user");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const role = req.role;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }
    if (role !== "Admin") {
      return res.status(401).json({ message: "Only Admin can add book" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    isAdmin
};
