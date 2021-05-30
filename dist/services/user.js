"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const player_1 = require("../models/player");
class UserService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = '0.rfyj3n9nzh';
    }
    static get userAttributes() {
        return ['username', 'email'];
    }
    static get user() {
        return UserService._user;
    }
    register({ email, password, username, name }) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return user_1.default.create({ email, password: hash, username, name })
                .then(u => this.getUserByEmail(u.email));
        });
    }
    login({ email, password }) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return user_1.default.findOne({ where: { email, password: hash }, include: player_1.default }).then((u) => {
                const { name, username, email, points, profilePhoto } = u;
                return { token: jwt.sign({ name, username, email, points, profilePhoto }, this._jwtSecret) };
            });
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                UserService._user = user_1.default.findByPk(decoded['email']);
                resolve(true);
                return;
            });
        });
    }
    getUserByEmail(email) {
        return user_1.default.findByPk(email, {
            attributes: UserService.userAttributes
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.js.map