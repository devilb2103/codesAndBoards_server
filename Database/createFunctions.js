const { question } = require('../Models/question');

async function CreateSampleQuestions(count) {
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

module.exports = {
  CreateSampleQuestions: CreateSampleQuestions,
};
