"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../instances/sequelize");
const Player = sequelize_2.sequelize.define('player', {
    userEmail: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.TEXT,
        unique: true,
    },
    profilePhoto: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    points: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    commendmentsCount: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    penaltyExpiration: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    penaltyReason: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    freezeTableName: true //Stops auto-pluralization to table names
});
exports.default = Player;
//# sourceMappingURL=player.js.map