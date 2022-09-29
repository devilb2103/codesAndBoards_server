const { quiz } = require('../Models/quiz');
const {
  select_quizzes_by_teamID,
  select_api_keys_by_teamID,
} = require('./selectFunctions');

async function update_answers(teamID, answerList) {
  let passed = true;
  if (answerList.includes(0)) {
    passed = false;
  }
  const quizObj = await select_quizzes_by_teamID(teamID);
  let answer = JSON.parse(quizObj)[0]['question']; //list of objects
  let updated = [];
  for (let i = 0; i < answer.length; i++) {
    let obj = answer[i];
    obj['isCorrect'] = String(answerList[i]);
    updated.push(obj);
  }

  await quiz.update(
    {
      question: updated,
    },
    {
      where: { team_id: teamID },
    }
  );

  if (passed) {
    const keyObj = await select_api_keys_by_teamID(teamID);
    return keyObj;
  } else {
    return 0;
  }
}

module.exports = {
  update_answers: update_answers,
};
