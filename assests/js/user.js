const { DataTypes } = require('sequelize');
const db = require('./sequelize');

const UserTable = db.sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: "Email must be unique",
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email is required",
            },
            notEmpty: {
                msg: "Email is required",
            },
            isEmail: {
                msg: "Invalid email format",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
});
db.sequelize.sync({ alter: true });
module.exports = UserTable;
