const { where } = require('sequelize');
const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');
const { sequelize } = require('./setup');

async function resetDB() {
  await sequelize.drop();
  return 'dropped all tables';
}

async function delete_All() {
  await api_key.destroy({ truncate: true });
  await member.destroy({ truncate: true });
  // await question.destroy({ truncate: true });
  await quiz.destroy({ truncate: true });

  return 'Deleted all dynamic values';
}

async function delete_api_Keys() {
  await api_key.destroy({ truncate: true });
  return 'deleted all api keys';
}

async function delete_api_Keys_by_teamID(teamID) {
  await api_key.destroy({
    where: {
      team_id: teamID,
    },
  });
  return `deleted api key with team id ${teamID}`;
}

async function delete_members() {
  await member.destroy({ truncate: true });
  return 'deleted all members';
}

async function delete_members_by_ID(ID) {
  await member.destroy({
    where: { id: ID },
  });
  return `deleted member with id ${ID}`;
}

async function delete_members_by_teamID(teamID) {
  await member.destroy({
    where: {
      team_id: teamID,
    },
  });
  return `deleted members with team id ${teamID}`;
}

async function delete_questions() {
  await question.destroy({ truncate: true });
  return 'deleted all questions';
}

async function delete_questions_by_ID(ID) {
  await question.destroy({
    where: {
      id: ID,
    },
  });
  return `deleted question with id ${ID}`;
}

async function delete_quizzes() {
  await quiz.destroy({ truncate: true });
  return 'deleted all quizzes';
}

async function delete_quizzes_by_ID(ID) {
  await quiz.destroy({
    where: {
      id: ID,
    },
  });
  return `deleted quiz with id ${ID}`;
}

async function delete_quizzes_by_teamID(teamID) {
  await quiz.destroy({
    where: {
      team_id: teamID,
    },
  });
  return `deleted quiz with team id ${teamID}`;
}

/**
 * grouped operations
 */

async function delete_team_by_teamID(teamID) {
  try {
    await sequelize.transaction(async (transaction) => {
      await delete_members_by_teamID(teamID);
      await delete_quizzes_by_teamID(teamID);
      await delete_api_Keys_by_teamID(teamID);
    });
    return `deleted team with team id: ${teamID}`;
  } catch (err) {
    return `could not delete team with team id: ${teamID}`;
  }
}

module.exports = {
  //global
  resetDB: resetDB,
  delete_All: delete_All,
  //table wise
  delete_api_Keys: delete_api_Keys,
  delete_api_Keys_by_teamID: delete_api_Keys_by_teamID,
  //
  delete_members: delete_members,
  delete_members_by_ID: delete_members_by_ID,
  delete_members_by_teamID: delete_members_by_teamID,
  //
  delete_questions: delete_questions,
  delete_questions_by_ID: delete_questions_by_ID,
  //
  delete_quizzes: delete_quizzes,
  delete_quizzes_by_ID: delete_quizzes_by_ID,
  delete_quizzes_by_teamID: delete_quizzes_by_teamID,
  //
  delete_team_by_teamID: delete_team_by_teamID,
};
