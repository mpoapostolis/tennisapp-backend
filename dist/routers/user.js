"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
const user_1 = require("../rules/user");
const user_2 = require("../services/user");
exports.userRouter = express_1.Router();
const userService = new user_2.UserService();
exports.userRouter.post('/register', user_1.userRules['forRegister'], (req, res) => {
    const errors = express_validator_2.validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const payload = express_validator_1.matchedData(req);
    const user = userService.register(payload);
    return user.then(u => res.json(u));
});
exports.userRouter.post('/login', user_1.userRules['forLogin'], (req, res) => {
    const errors = express_validator_2.validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const payload = express_validator_1.matchedData(req);
    const token = userService.login(payload);
    return token.then(t => res.json(t));
});
//# sourceMappingURL=user.js.map