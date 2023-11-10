const { hash, genSalt, compare } = require("bcrypt");
const db = require("../config/db");
const { ThrowError } = require("../middlewares/ErrorHandler");
const Users = db.Users;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const signUpApi = async (req, res, next) => {
  if (req.user) {
    return res.json({
      message: "User Already Logged In",
      user: req.user,
    });
  } else {
    try {
      const { name, email, password } = req.body;

      const userData = {
        name,
        email,
        password,
      };

      const newUser = Users.build(userData); 
      await newUser.validate(); 

      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, error: "User Already Exists" });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      if (!hashedPassword) {
        return res
          .status(400)
          .json({ success: false, error: "Error Hashing Password" });
      }

      newUser.password = hashedPassword; 

      await newUser.save(); 

      return res
        .status(200)
        .json({ success: true, message: "Signed Up Successfully", newUser: { name, email } });
    } catch (error) {
      console.error("Error adding User: ", error);

      if (error.errors) {
        // Handle validation errors
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        return res.status(400).json({ errors: validationErrors });
      }

      return res.status(500).json({ error: "Error Adding User" });
    }
  }
};

const loginApi = async (req, res) => {
  if (req.user) {
    return res.json({
      message: "User Already Logged In",
      user: req.user,
    });
  } else {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: { email },
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Wrong Email",
        });
      }
      const cpass = await compare(password, user.password);
      if (!cpass) {
        return res.json({
          success: false,
          message: "Incorrect Password",
        });
      }
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const oneDayInSeconds = 24 * 60 * 60;

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: oneDayInSeconds * 1000,
      });

      return res.json({
        success: true,
        message: "Login Sccessfull",
        data: {
          token,
          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Some Error Occured",
        errors: error,
      });
    }
  }
};

const AllUsers = async (req, res) => {
  try {
    if (req.user) {
      const users = await Users.findAll({
        attributes: ["name", "email", "_id", "is_online"],
        where: {
          _id: {
            [Op.not]: req.user._id
          }
        }
      });
      return res.json({
        success: true,
        users
      });
    } else {
      return res.json({
        success: false,
        message: "Please LogIn to exccess this api",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Some Error Occured",
      errors: error,
    })
  }
}

module.exports = {
  signUpApi,
  loginApi,
  AllUsers
};
