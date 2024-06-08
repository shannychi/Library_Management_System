const jwt = require("jsonwebtoken");
const libraryUser = require("../Model/user");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    const user = await libraryUser.findById(userId);
    if (user.role !== "Admin") {
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
