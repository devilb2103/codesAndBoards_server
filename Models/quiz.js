const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/setup');

const quiz = sequelize.define('quiz', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
  },
  question: {
    type: DataTypes.JSON,
  },
});

module.exports = {
  quiz: quiz,
};
