
const express = require("express");
const { home, signUp, login } = require("../controllers/StaticController");
const loggedIn = require("../middlewares/Auth");
const router = express.Router();

router.get("/", home);
router.get("/signup", loggedIn, signUp);
router.get("/login", loggedIn, login);

module.exports = router;