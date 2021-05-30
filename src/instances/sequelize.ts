import { Sequelize } from "sequelize";

const db = "tennisapp";
const username = "admin";
const password = "27101994";

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
});

sequelize.authenticate();
