const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config({
    path: "../.env"
});

const Db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql"
}
);

Db.authenticate().then(() => {
    console.log("Connected To Database Successfully");
}).catch((error) => {
    console.log("error Connecting to Database", error);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = Db;
db.Users = require("../models/UserModel")(Db, DataTypes);
db.Chats = require("../models/ChatsModel")(Db, DataTypes);
db.Users.hasMany(db.Chats);
db.Chats.belongsTo(db.Users, { foreignKey: "sender_id" });
db.Chats.belongsTo(db.Users, { foreignKey: "receiver_id" });

db.sequelize.sync().then(() => {
    console.log(`yes re-sync`);
}).catch((error) => {
    console.log("error creating Tables", error);
})


module.exports = db;