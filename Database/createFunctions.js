const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');
const { generateQuestions, getRand } = require('../Utils/questionGenerator');

const apiKeys = ['XNHQPD3M', 'TF5DJ4B8', '3ALR263E', 'PZEEZ9S7', 'YV65UQLM'];
const questionCount = 6;

async function create_SampleQuestions(count) {
  const rowCount = await question.count();
  for (let i = 0; i < count; i++) {
    let q = await question.create({
      id: rowCount + i + 1,
      description: `question ${rowCount + i + 1}`,
      option_a: 'option_a',
      option_b: 'option_b',
      option_c: 'option_c',
      option_d: 'option_d',
      isCorrect: 'some Boolean',
    });
  }
  return `${count} questions created`;
}

async function create_Members(users) {
  // fetch member init data
  const latestMemberEntry = await member.count();
  let latestTeamEntry = await member.max('team_id');
  let teamId = parseInt(latestTeamEntry) + 1;
  if (!latestMemberEntry) {
    teamId = 1;
  }

  // create members
  for (let i = 0; i < users.length; i++) {
    const userId = latestMemberEntry + i + 1;
    const name = users[i];
    const memberObj = await member.create({
      id: userId,
      name: name,
      team_id: teamId,
    });
  }

  // create quiz
  await create_Quiz(teamId, questionCount);

  // create key
  await create_api_Key(teamId);

  return `created members ${users}`;
}

async function create_Quiz(teamId, questionCount) {
  let questions = await generateQuestions(questionCount);
  const latestEntry = await quiz.count();
  let quizId = latestEntry + 1;
  const quizObj = await quiz.create({
    id: quizId,
    team_id: teamId,
    question: questions,
  });
}

async function create_api_Key(teamId) {
  let key = apiKeys[getRand(apiKeys.length)];
  const latestEntry = await api_key.count();
  const keyObj = await api_key.create({
    id: latestEntry + 1,
    key: key,
    team_id: teamId,
  });
}

module.exports = {
  create_SampleQuestions: create_SampleQuestions,
  create_Members: create_Members,
  create_Quiz: create_Quiz,
  create_api_Key: create_api_Key,
};
