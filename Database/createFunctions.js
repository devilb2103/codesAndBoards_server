const { api_key } = require('../Models/api_key');
const { member } = require('../Models/member');
const { question } = require('../Models/question');
const { quiz } = require('../Models/quiz');
const {
  generateQuestions,
  getRand,
  validateNameList,
} = require('../Utils/questionGenerator');
const { sequelize } = require('./setup');

const apiKeys = ['XNHQPD3M', 'TF5DJ4B8', '3ALR263E', 'PZEEZ9S7', 'YV65UQLM'];
const questionCount = 6;

async function create_SampleQuestions(count, res) {
  try {
    for (let i = 0; i < count; i++) {
      let q = await question.create({
        description: `question description`,
        option_a: 'option_a',
        option_b: 'option_b',
        option_c: 'option_c',
        option_d: 'option_d',
        correct_option: getRand(4) + 1,
      });
    }
    res.status(200).send({
      status: true,
      message: `${count} questions created`,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: `could not create ${count} questions, ${err}`,
    });
  }
}

async function create_Members(users, res) {
  try {
    sequelize.transaction(async (transaction) => {
      // fetch member init data
      let x = validateNameList(users);
      if (!x[0]) {
        res.status(400).send({
          status: false,
          message: x[1],
        });
        return;
      } else {
        const latestMemberEntry = await member.count();
        let teamId = 0;
        if (!latestMemberEntry) {
          teamId = 1;
        } else {
          let latestTeamEntry = await member.max('team_id');
          let id1 = parseInt(latestTeamEntry) + 1;
          teamId = id1;
        }

        // create members
        for (let i = 0; i < users.length; i++) {
          const name = users[i];
          const memberObj = await member.create(
            {
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
        res.status(200).send({
          status: true,
          message: `created members ${users}`,
          teamId: teamId,
        });
      }
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: `could not create members ${users}`,
    });
  }
}

async function create_Quiz(teamId, questionCount, transaction) {
  let questions = await generateQuestions(questionCount);
  const quizObj = await quiz.create(
    {
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
  const keyObj = await api_key.create(
    {
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
