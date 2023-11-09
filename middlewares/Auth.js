

const jwt = require('jsonwebtoken');
const db = require('../config/db');
const Users = db.Users;
const jWT_SECRET_KEY = process.env.jWT_SECRET_KEY;

const loggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        return next();
    }
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, jWT_SECRET_KEY);
        const user = await Users.findOne({
            where: {
                _id: decoded.id
            }
        })
        if (!user) {
            return next()
        }
        req.user = user;
        return next();
    } catch (error) {
        if (error) return next();
    }

}

module.exports = loggedIn;