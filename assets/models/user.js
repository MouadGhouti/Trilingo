const { DataTypes } = require('sequelize');
const db = require('../js/sequelize');

const UserTable = db.sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
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
},
    {
        tableName: 'Users',
    });
db.sequelize.sync({ alert: true });
module.exports = UserTable;
