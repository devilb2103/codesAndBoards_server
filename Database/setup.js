const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'dcs1cuvsr3tjud',
  username: 'fjcyaytwfsxbgh',
  password: '3c8ce7c35ee79d5485a4e57c87f779c586ed5b7571c079d5e683d1235dfd8633',
  host: 'ec2-107-23-76-12.compute-1.amazonaws.com',
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
