const { where } = require("sequelize");
const { api_key } = require("../Models/api_key");
const { member } = require("../Models/member");
const { questions } = require("../Models/questions");
const { quiz } = require("../Models/quiz");
const { sequelize } = require("./setup");

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("connected to db");
  } catch (err) {
    console.log("Could not connect to db");
  }
}

function initializeTables() {
  api_key.sync();
  member.sync();
  questions.sync();
  quiz.sync();
}

function addMember(id) {
  const user = member.create({
    id: id,
    name: "dev1",
    team_id: 5,
  });
}

function removeMember(id) {
  const user = member.destroy({
    where: {
      id: id,
    },
  });
}

async function selectMember() {
  const x = await member.findAll({
    attributes: ["id", "team_id"],
  });
  console.log(JSON.stringify(x));
}

module.exports = {
  connectDB: connectDB,
  initializeTables: initializeTables,
  addMember: addMember,
  selectMember: selectMember,
  removeMember: removeMember,
};
