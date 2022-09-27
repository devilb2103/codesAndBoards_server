const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize } = require("../Database/setup")

const quiz = sequelize.define('quiz', {
    "id": {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    "team_id": {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    "question": {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = {
    quiz: quiz
}