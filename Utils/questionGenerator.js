const { select_questions } = require('../Database/selectFunctions');
const { question } = require('../Models/question');

async function generateQuestions(count) {
  let indexes = [];
  sourceLimit = await question.count(); //gets number of questions from db
  //generates array of integers denoting to-be picked quiestons from db
  for (let i = 0; i < count; i++) {
    const id = getRand(sourceLimit);
    if (indexes.includes(id)) {
      i -= 1;
    } else {
      indexes.push(id);
    }
  }

  //
  // generates and returns a list of question objects
  const src = await select_questions();
  const parsedSrc = JSON.parse(src); //list of obj {}
  let selectedQuestions = [];
  for (let i = 0; i < indexes.length; i++) {
    selectedQuestions.push(parsedSrc[indexes[i]]);
  }
  return selectedQuestions;
}

function getRand(n) {
  return Math.floor(Math.random() * n);
}

function validateNameList(names) {
  if (names.length <= 4 && names.length >= 2) {
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (name.length < 3) {
        return false;
      }
    }
    return true;
  } else return false;
}
module.exports = {
  generateQuestions: generateQuestions,
  getRand: getRand,
  validateNameList: validateNameList,
};
