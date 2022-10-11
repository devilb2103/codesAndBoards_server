const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/setup');

const member = sequelize.define('member', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = {
  member: member,
};
