const { DataTypes } = require("sequelize");
const { sequelize } = require("../Database/setup");

const questions = sequelize.define("question", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option_a: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option_b: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option_c: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option_d: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCorrect: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  questions: questions,
};
