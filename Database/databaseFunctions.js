const { CreateSampleQuestions } = require('./createFunctions');
const { deleteAll } = require('./deleteFunctions');
const {
  select_api_keys,
  select_members,
  select_questions,
  select_quizzes,
} = require('./selectFunctions');

module.exports = {
  //select functions
  select_api_keys: select_api_keys,
  select_members: select_members,
  select_questions: select_questions,
  select_quizzes: select_quizzes,

  //create functions
  CreateSampleQuestions: CreateSampleQuestions,

  //delete functions
  deleteAll: deleteAll,
};
