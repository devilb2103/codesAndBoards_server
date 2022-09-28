const express = require('express');
const cors = require('cors');
const passport = require('passport');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./Database/setup');
const {
  select_members,
  select_questions,
  select_api_keys,
  select_quizzes,
  select_members_by_ID,
  select_members_by_teamID,
  select_quizzes_by_teamID,
  select_api_keys_by_teamID,
} = require('./Database/selectFunctions');
const {
  create_Members,
  create_SampleQuestions,
} = require('./Database/createFunctions');
const {
  delete_members,
  delete_All,
  resetDB,
} = require('./Database/deleteFunctions');
const { update_answers } = require('./Database/patchFunctions');

dotenv.config();

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

/**
 * select routes
 */
app.get('/select/members', async (req, res) => {
  let data = await select_members();
  res.send(data);
});

app.get('/select/members/ID/:id', async (req, res) => {
  let data = await select_members_by_ID(req.params.id);
  res.send(data);
});

app.get('/select/members/teamID/:id', async (req, res) => {
  let data = await select_members_by_teamID(req.params.id);
  res.send(data);
});

app.get('/select/quizzes', async (req, res) => {
  let data = await select_quizzes();
  res.send(data);
});

app.get('/select/quizzes/teamID/:id', async (req, res) => {
  let data = await select_quizzes_by_teamID(req.params.id);
  res.send(data);
});

app.get('/select/api_Keys', async (req, res) => {
  let data = await select_api_keys();
  res.send(data);
});

app.get('/select/api_Keys/teamID/:id', async (req, res) => {
  let data = await select_api_keys_by_teamID(req.params.id);
  res.send(data);
});

app.get('/select/questions', async (req, res) => {
  let data = await select_questions();
  res.send(data);
});

/**
 * create routes
 */

app.post('/create/team', async (req, res) => {
  const x = await create_Members(req.body.names);
  res.send(x);
});

/**
 * delte routes
 */

app.get('/reset', async (req, res) => {
  await delete_All();
  res.send('all tables have been reset');
});

/**
 * other routes
 */
app.patch('/submitQuiz', async (req, res) => {
  const teamID = req.body.teamID;
  const answerList = req.body.answerKey;
  const response = await update_answers(teamID, answerList);
  res.send(response);
});

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     status: false,
//     enviroment: process.env.MODE,
//     message:
//       err.status === 403
//         ? err.message
//         : process.env.MODE === 'development'
//         ? err.message
//         : 'Error Occoured',
//   });
// });

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`port ${port}`));
});
