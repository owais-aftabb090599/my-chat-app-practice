const jwt = require("jsonwebtoken");
const db = require("../config/db");
const Users = db.Users;
const jWT_SECRET_KEY = process.env.jWT_SECRET_KEY;

const loggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || !decoded._id) {
      return next();
    }

    const user = await Users.findOne({
      where: {
        _id: decoded._id,
      },
    });

    if (!user) {
      return next();
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Error in loggedIn middleware:", error);
    return next();
  }
};

module.exports = loggedIn;

