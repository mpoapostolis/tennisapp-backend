"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const user_1 = require("./routers/user");
const tokenGuard_1 = require("./middlewares/tokenGuard");
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', user_1.userRouter);
// Unprotected Get
app.get('/some-resource', (req, res, next) => {
    res.json('Hello World');
});
app.use(tokenGuard_1.tokenGuard());
// Protected Get
app.get('/some-protected-resource', (req, res, next) => {
    res.json('Protected Hello World');
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map