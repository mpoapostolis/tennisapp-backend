"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../instances/sequelize");
const player_1 = require("./player");
const User = sequelize_2.sequelize.define('user', {
    email: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.TEXT,
        unique: true,
    },
    username: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.TEXT
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    freezeTableName: true //Stops auto-pluralization to table names
});
User.hasMany(player_1.default, {
    sourceKey: 'email',
    foreignKey: 'userEmail',
    as: 'player'
});
player_1.default.belongsTo(User, {
    foreignKey: 'userEmail',
    as: 'user'
});
exports.default = User;
//# sourceMappingURL=user.js.map