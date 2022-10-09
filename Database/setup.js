const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'dcvhq3hf5it845',
  username: 'hiiqzdsghjlqrv',
  password: '99ff7c358407579628cb77f9133ef12bcf57d64081ab0f90cc29b732c1b62f04',
  host: 'ec2-23-21-207-93.compute-1.amazonaws.com',
  port: 5432,
  pool: {
    max: 2,
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
