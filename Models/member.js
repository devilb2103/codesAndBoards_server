const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize } = require("../Database/setup")

const member = sequelize.define('members', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = {
    member: member
}