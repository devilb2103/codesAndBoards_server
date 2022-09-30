const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');
const { generateQuestions, getRand } = require('../Utils/questionGenerator');
const { sequelize } = require('./setup');

const apiKeys = ['XNHQPD3M', 'TF5DJ4B8', '3ALR263E', 'PZEEZ9S7', 'YV65UQLM'];
const questionCount = 6;

async function create_SampleQuestions(count) {
  try {
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
  } catch (err) {
    return `could not create ${count} questions`;
  }
}

async function create_Members(users, res) {
  try {
    sequelize.transaction(async (transaction) => {
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
        const memberObj = await member.create(
          {
            id: userId,
            name: name,
            team_id: teamId,
          },
          {
            transaction: transaction,
          }
        );
      }

      // create quiz
      await create_Quiz(teamId, questionCount);

      // create key
      await create_api_Key(teamId);

      res.status(200).send(`created members ${users}`);
    });
  } catch (err) {
    res.send(`could not create members ${users}`);
  }
}

async function create_Quiz(teamId, questionCount, transaction) {
  let questions = await generateQuestions(questionCount);
  const latestEntry = await quiz.count();
  let quizId = latestEntry + 1;
  const quizObj = await quiz.create(
    {
      id: quizId,
      team_id: teamId,
      question: questions,
    },
    {
      transaction: transaction,
    }
  );
}

async function create_api_Key(teamId, transaction) {
  let key = apiKeys[getRand(apiKeys.length)];
  const latestEntry = await api_key.count();
  const keyObj = await api_key.create(
    {
      id: latestEntry,
      key: key,
      team_id: teamId,
    },
    {
      transaction: transaction,
    }
  );
}

module.exports = {
  create_SampleQuestions: create_SampleQuestions,
  create_Members: create_Members,
  create_Quiz: create_Quiz,
  create_api_Key: create_api_Key,
};
