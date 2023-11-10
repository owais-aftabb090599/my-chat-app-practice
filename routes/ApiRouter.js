const express = require("express");
const { signUpApi, loginApi, AllUsers } = require("../controllers/ApiController");
const loggedIn = require("../middlewares/Auth");
const router = express.Router();

router.route("/api/signup").post(loggedIn, signUpApi);
router.route("/api/login").post(loggedIn, loginApi);
router.route("/api/all-users").get(loggedIn, AllUsers);

module.exports = router;