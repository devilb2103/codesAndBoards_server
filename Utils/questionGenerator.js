const { select_questions } = require('../Database/selectFunctions');
const { question } = require('../Models/question');
var validator = require('validator');

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

const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function validateNameList(names) {
  if (names.length <= 4 && names.length >= 2) {
    for (let i = 0; i < names.length; i++) {
      const name = String(names[i]).trim();
      if (name.length < 3 && name.length > 30) {
        return (
          false,
          'name is too short (less than 2 letters) or too long (more than 30 letters)'
        );
      } else if (!/^[a-zA-Z]+$/.test(name)) {
        return (
          false,
          'only letters allowed (try using camel casing (nameSurname) instead of spaces)'
        );
      } else if (countOccurrences(names, name) > 1) {
        return false, 'cannot repeat names';
      }
    }
    return true;
  } else return false, 'too many or too less members';
}
module.exports = {
  generateQuestions: generateQuestions,
  getRand: getRand,
  validateNameList: validateNameList,
};
