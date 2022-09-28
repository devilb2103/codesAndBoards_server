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
}

async function delete_api_Keys() {
  await api_key.destroy({ truncate: true });
}

async function delete_members() {
  await member.destroy({ truncate: true });
}

async function delete_questions() {
  await question.destroy({ truncate: true });
}

async function delete_quizzes() {
  await quiz.destroy({ truncate: true });
}

module.exports = {
  resetDB: resetDB,
  delete_All: delete_All,
  delete_api_Keys: delete_api_Keys,
  delete_members: delete_members,
  delete_questions: delete_questions,
  delete_quizzes: delete_quizzes,
};
