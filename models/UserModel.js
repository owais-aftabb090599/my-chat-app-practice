module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name Cannot Be Empty" },
        len: [3],
      },
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password Cannot Be Empty" },
        len: {
          args: [6],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    email: {
      type: DataTypes.STRING(200),
      unique: { msg: "Email Should Be Unique" },
      allowNull: false,
      validate: {
        isEmail: { msg: "Please Enter Proper E-Mail" },
        notEmpty: { msg: "E-Mail Cannot Be Empty" },
      },
    },
    is_online: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
  });
  return Users;
};
