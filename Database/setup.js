const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  logging: false,
  operatorsAliases: '0',
  port: 5432,
  pool: {
    max: 100,
    min: 0,
    acquire: 100000,
    idle: 20000000000,
  },
  dialect: 'postgres',
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
