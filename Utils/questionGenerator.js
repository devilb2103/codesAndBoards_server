const { select_questions } = require('../Database/selectFunctions');
const { question } = require('../Models/question');

async function generateQuestions(count) {
  let indexes = [];
  sourceLimit = await question.count();
  for (let i = 0; i < count; i++) {
    const id = getRand(sourceLimit);
    if (indexes.includes(id)) {
      i -= 1;
    } else {
      indexes.push(id);
    }
  }
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
module.exports = {
  generateQuestions: generateQuestions,
  getRand: getRand,
};
