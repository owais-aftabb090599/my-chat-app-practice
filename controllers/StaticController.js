const home = async (req, res) => {
  try {
    if (req.user) {
      res.render("index", { name: req.user.name });
    } else {
      res.render("index", { name: "Guest" });
    }
  } catch (error) {
    console.log(error);
  }
};
const signUp = (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
};
const login = (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

const chats = (req, res) => {
  try {
    if (req.user) {
      res.render("chats", { user:{
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      }});
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
const logOut = (req, res) => {
  if (req.user) {
    res.clearCookie("token");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  home,
  signUp,
  login,
  chats,
  logOut
};
