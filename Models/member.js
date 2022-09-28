const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/setup');

const member = sequelize.define('member', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  team_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = {
  member: member,
};
