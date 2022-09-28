const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');
const { sequelize } = require('./setup');

/**
 * database resetter functions
 */
async function resetDB() {
  await sequelize.drop();
  return 'dropped all tables';
}

async function removeAllFromTable() {
  await api_key.destroy({ truncate: true });
  await member.destroy({ truncate: true });
  await question.destroy({ truncate: true });
  await quiz.destroy({ truncate: true });
}

/**
 * select * functions
 * */
async function showKeyTable() {
  let res = await api_key.findAll({
    attributes: ['id', 'key', 'team_id'],
  });
  return JSON.stringify(res);
}

async function showMemberTable() {
  let res = await member.findAll({
    attributes: ['id', 'name', 'team_id'],
  });
  return JSON.stringify(res);
}

async function showQuestionTable() {
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

async function showQuizTable() {
  let res = await quiz.findAll({
    attributes: ['id', 'team_id', 'question'],
  });
  return JSON.stringify(res);
}

/**
 * sample question generator
 */

async function AddQuestions(count) {
  const rowCount = await question.count();
  // for (let i = 0; i < count; i++) {
  // let q = await question.create({
  //     id: i, //rows + i + 1,
  //     description: 'q', //`question ${rows + i + 1}`,
  //     option_a: 'option_a',
  //     option_b: 'option_b',
  //     option_c: 'option_c',
  //     option_d: 'option_d',
  //     isCorrect: 'Boolean',
  //   });
  // }
  // const a = question.create({
  //   id: 1,
  // });
  // console.log(count);
  // return `${count} questions created`;
}

module.exports = {
  resetDB: resetDB,
  removeAllFromTable: removeAllFromTable,
  showKeyTable: showKeyTable,
  showMemberTable: showMemberTable,
  showQuestionTable: showQuestionTable,
  showQuizTable: showQuizTable,
  AddQuestions: AddQuestions,
};
