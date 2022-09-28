const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'de2l2lp6sflf2k',
  username: 'crdkjoafsdmpny',
  password: '16ac0ddff80826fcb37ae42c65ad555dbbb6e7abf2f16ab3d79be18020100fe6',
  host: 'ec2-54-160-200-167.compute-1.amazonaws.com',
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
