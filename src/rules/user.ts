import * as bcrypt from "bcrypt";
import { check } from "express-validator";
import User from "../models/user";

export const userRules = {
  forRegister: [
    check("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom((email) =>
        User.findOne({ where: { email } }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        })
      ),

    check("password").isLength({ min: 8 }).withMessage("Invalid password"),
    check("confirmPassword")
      .custom(
        (confirmPassword, { req }) => req.query.password === confirmPassword
      )
      .withMessage("Passwords are different"),
    check("name").optional(),
  ],
  forLogin: [
    check("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom((email) =>
        User.findOne({ where: { email } }).then((user) => {
          if (!user) {
            return Promise.reject("Invalid email or password");
          }
        })
      ),
    check("password").custom((password, { req }) => {
      return User.findOne({ where: { email: req.query.email } }).then(
        (user) => {
          console.log({ password, userPass: user.password });
          bcrypt.compare(password, user.password).then((equal) => {
            console.log({ equal });
            return Promise.reject("Invalid email or password");
          });
        }
      );
    }),
  ],
};
