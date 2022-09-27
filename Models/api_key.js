const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize } = require("../Database/setup")

const api_key = sequelize.define('api_Key', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    "key": {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    "team_id": {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = {
    api_key: api_key
}