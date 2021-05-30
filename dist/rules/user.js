"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRules = void 0;
const bcrypt = require("bcrypt");
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
exports.userRules = {
    forRegister: [
        express_validator_1.check('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => user_1.default.findAll({ where: { email } }).then(u => !!!u)).withMessage('Email exists'),
        express_validator_1.check('username')
            .custom(username => user_1.default.findAll({ where: { username } }).then(u => !!!u)).withMessage('Username exists'),
        express_validator_1.check('password')
            .isLength({ min: 8 }).withMessage('Invalid password'),
        express_validator_1.check('confirmPassword')
            .custom((confirmPassword, { req }) => {
            console.log({ confirmPassword, req: req.query });
            return req.body.password === confirmPassword;
        }).withMessage('Passwords are different')
    ],
    forLogin: [
        express_validator_1.check('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => user_1.default.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid email or password'),
        express_validator_1.check('password')
            .custom((password, { req }) => {
            return user_1.default.findOne({ where: { email: req.body.email } })
                .then(u => bcrypt.compare(password, u.password));
        }).withMessage('Invalid email or password')
    ]
};
//# sourceMappingURL=user.js.map