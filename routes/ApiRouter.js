const express = require("express");
const { signUpApi, loginApi } = require("../controllers/ApiController");
const loggedIn = require("../middlewares/Auth");
const router = express.Router();

router.route("/api/signup").post(loggedIn, signUpApi);
router.route("/api/login").post(loggedIn, loginApi);

module.exports = router;