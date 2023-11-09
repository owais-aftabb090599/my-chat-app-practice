
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Name Cannot Be Empty" }
            }
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Name Cannot Be Empty" }
            }
        },
        email: {
            type: DataTypes.STRING(200),
            unique: { msg: "Email Should Be Unique" },
            allowNull: false,
            validate: {
                isEmail: { msg: "Please Enter Proper Em-Mail" },
                notEmpty: { msg: "E-Mail Cannot Be Empty" }
            }
        },
        is_online: {
            type: DataTypes.STRING,
            defaultValue: '0'
        }
    })
    return Users;
}