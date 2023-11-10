
const express = require("express");
const { home, signUp, login, chats, logOut } = require("../controllers/StaticController");
const loggedIn = require("../middlewares/Auth");
const router = express.Router();

router.get("/", loggedIn, home);
router.get("/signup", loggedIn, signUp);
router.get("/login", loggedIn, login);
router.get("/chats", loggedIn, chats);
router.get("/logout", loggedIn, logOut);

module.exports = router;