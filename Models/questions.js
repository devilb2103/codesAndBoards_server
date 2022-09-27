const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize } = require("../Database/setup")

const questions = sequelize.define('questions', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_a: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_b: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_c: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_d: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isCorrect: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
})

module.exports = {
    questions: questions
}