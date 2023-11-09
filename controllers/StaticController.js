

const home = (req, res) => {
    res.render("index");
}
const signUp = (req, res) => {
    res.render("signup")
}
const login = (req, res) => {
    res.render('login')
}


module.exports = {
    home,
    signUp,
    login
}