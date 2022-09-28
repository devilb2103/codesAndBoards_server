const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/setup');

const api_key = sequelize.define('api_Key', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  key: {
    type: DataTypes.STRING,
  },
  team_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = {
  api_key: api_key,
};
