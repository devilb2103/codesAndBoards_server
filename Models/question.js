const { DataTypes } = require('sequelize');
const { sequelize } = require('../Database/setup');

const question = sequelize.define('question', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
  option_a: {
    type: DataTypes.STRING,
  },
  option_b: {
    type: DataTypes.STRING,
  },
  option_c: {
    type: DataTypes.STRING,
  },
  option_d: {
    type: DataTypes.STRING,
  },
  isCorrect: {
    type: DataTypes.STRING,
  },
});

module.exports = {
  question: question,
};
