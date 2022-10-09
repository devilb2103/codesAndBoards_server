const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'dd9l514hmes82v',
  username: 'aamjqiojxoudoe',
  password: '3a080219a7f570e26214f4373e0f396cab7656fc1d86bc5142add81798c2e444',
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
