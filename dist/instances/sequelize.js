"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const db = 'tennisapp';
const username = 'admin';
const password = '27101994';
exports.sequelize = new sequelize_1.Sequelize(db, username, password, {
    dialect: "mariadb",
    host: "localhost"
    // port: 3306,
});
exports.sequelize.authenticate();
//# sourceMappingURL=sequelize.js.map