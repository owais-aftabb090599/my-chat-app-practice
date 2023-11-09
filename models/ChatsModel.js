
const db = require("../config/db");
const Users = db.Users;

module.exports = (sequelize, DataTypes) => {
    const Chats = sequelize.define("Chats", {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        sender_id: {
            type: DataTypes.UUID,
            references: { model: Users, key: '_id' }
        },
        receiver_id: {
            type: DataTypes.UUID,
            references: { model: Users, key: '_id' }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Message Cannot Be Empty" }
            }
        }
    });
    return Chats;
}