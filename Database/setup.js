const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "d9v1evbomcrcnt",
  username: "tdmwchfardqxem",
  password: "998af5c9379d6ceec9ebd168cb07616f71ff33c82a9ad5b34e4a437b6aa6150b",
  host: "ec2-18-209-78-11.compute-1.amazonaws.com",
  port: 5432,
  pool: {
    max: 2,
  },
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, //to fix
    },
  },
});

module.exports = {
  sequelize: sequelize,
};
