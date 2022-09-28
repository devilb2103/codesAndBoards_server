const { generateQuestions, getRand } = require('./questionGenerator');

let timeLimit = 15 * 60; //in seconds
let apiKeys = ['XNHQPD3M', 'TF5DJ4B8', '3ALR263E', 'PZEEZ9S7', 'YV65UQLM'];
let questionCount = 6;
let teams = []; //temp storage

function generateTeam(names) {
  let a = {};
  a['teamId'] = teams.length + 1;
  a['apiKey'] = apiKeys[getRand(apiKeys.length)];
  a['participants'] = names; //names is a list of strings
  a['timeLimit'] = timeLimit;
  a['questions'] = generateQuestions(6);
  return a;
}

module.exports = {
  generateTeam: generateTeam,
  teams: teams,
  apiKeys: apiKeys,
};
