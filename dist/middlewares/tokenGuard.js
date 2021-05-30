"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGuard = void 0;
const user_1 = require("../services/user");
const userService = new user_1.UserService();
function getTokenFromHeaders(headers) {
    const header = headers.authorization;
    if (!header)
        return header;
    return header.split(' ')[1];
}
exports.tokenGuard = (() => (req, res, next) => {
    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || '';
    const hasAccess = userService.verifyToken(token);
    hasAccess.then(a => {
        if (!a)
            return res.status(403).send({ message: 'No access' });
        next();
    });
});
//# sourceMappingURL=tokenGuard.js.map