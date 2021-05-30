import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as Bluebird from "bluebird";
import User, { UserCreationAttributes, UserInstance } from "../models/user";
import Player from "../models/player";

export class UserService {
  private readonly _saltRounds = 12;
  private readonly _jwtSecret = "0.rfyj3n9nzh";

  static get userAttributes() {
    return ["email", "name"];
  }
  private static _user;

  static get user() {
    return UserService._user;
  }

  register({ email, password, name }: UserCreationAttributes) {
    return bcrypt.hash(password, this._saltRounds).then((hash) => {
      return User.create({ email, password: hash, name }).then((u) =>
        this.getUserByEmail(u.email)
      );
    });
  }

  login({ email }: UserCreationAttributes) {
    return User.findOne({
      where: { email },
      // include: Player,
    }).then((u) => {
      console.log({ u });
      const { name, email } = u;
      return {
        token: jwt.sign({ name, email }, this._jwtSecret),
      };
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, this._jwtSecret, (err, decoded) => {
        if (err) {
          resolve(false);
          return;
        }

        UserService._user = User.findByPk(decoded["email"]);
        resolve(true);
        return;
      });
    }) as Promise<boolean>;
  }

  getUserByEmail(email: string) {
    return User.findByPk(email, {
      attributes: UserService.userAttributes,
    }) as Bluebird<UserInstance>;
  }
}
