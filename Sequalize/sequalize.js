const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.db,
  process.env.dbUser,
  process.env.dbPassword,
  {
    host: process.env.host,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
);

const makeDbConntection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: false
    });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("err", error);
  }
};


module.exports = { sequelize, makeDbConntection };
