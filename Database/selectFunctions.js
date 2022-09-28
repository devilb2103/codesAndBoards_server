const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');

async function select_api_keys() {
  let res = await api_key.findAll({
    attributes: ['id', 'key', 'team_id'],
  });
  return JSON.stringify(res);
}

async function select_api_keys_by_teamID(teamID) {
  let res = await api_key.findAll({
    attributes: ['id', 'key', 'team_id'],
    where: { team_id: teamID },
  });
  return JSON.stringify(res);
}

async function select_members() {
  let res = await member.findAll({
    attributes: ['id', 'name', 'team_id'],
  });
  return JSON.stringify(res);
}

async function select_members_by_teamID(teamID) {
  let res = await member.findAll({
    attributes: ['id', 'name', 'team_id'],
    where: { team_id: teamID },
  });
  return JSON.stringify(res);
}

async function select_members_by_ID(ID) {
  let res = await member.findAll({
    attributes: ['id', 'name', 'team_id'],
    where: { id: ID },
  });
  return JSON.stringify(res);
}

async function select_questions() {
  let res = await question.findAll({
    attributes: [
      'id',
      'description',
      'option_a',
      'option_b',
      'option_c',
      'option_d',
      'isCorrect',
    ],
  });
  return JSON.stringify(res);
}

async function select_quizzes() {
  let res = await quiz.findAll({
    attributes: ['id', 'team_id', 'question'],
  });
  return JSON.stringify(res);
}

async function select_quizzes_by_teamID(teamID) {
  let res = await quiz.findAll({
    attributes: ['id', 'team_id', 'question'],
    where: { team_id: teamID },
  });
  return JSON.stringify(res);
}

module.exports = {
  select_api_keys: select_api_keys,
  select_api_keys_by_teamID: select_api_keys_by_teamID,
  //
  select_members: select_members,
  select_members_by_ID: select_members_by_ID,
  select_members_by_teamID: select_members_by_teamID,
  //
  select_questions: select_questions,
  //
  select_quizzes: select_quizzes,
  select_quizzes_by_teamID: select_quizzes_by_teamID,
};
