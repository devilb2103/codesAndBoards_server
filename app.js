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
  delete_All,
  delete_team_by_teamID,
  delete_members_by_ID,
  delete_questions,
  delete_questions_by_ID,
} = require('./Database/deleteFunctions');
const { update_answers } = require('./Database/patchFunctions');
const { validateNameList } = require('./Utils/questionGenerator');

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
  res.send(JSON.parse(data));
});

app.get('/select/quizzes/teamID/:id', async (req, res) => {
  let data = await select_quizzes_by_teamID(req.params.id);
  res.send(JSON.parse(data));
});

app.get('/select/api_keys', async (req, res) => {
  let data = await select_api_keys();
  res.send(data);
});

app.get('/select/api_keys/teamID/:id', async (req, res) => {
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

app.post('/validateUsers', async (req, res) => {
  res.send(validateNameList(req.body.names, res));
});

app.post('/create/team', async (req, res) => {
  await create_Members(req.body.names, res);
});

app.post('/create/sampleQuestions', async (req, res) => {
  await create_SampleQuestions(req.body.count, res);
});

/**
 * delete routes
 */

app.delete('/delete/members/ID', async (req, res) => {
  let data = await delete_members_by_ID(req.body.ID);
  res.send(data);
});

app.delete('/delete/team', async (req, res) => {
  await delete_team_by_teamID(req.body.teamID, res);
});

app.delete('/delete/questions', async (req, res) => {
  let data = await delete_questions();
  res.send(data);
});

app.delete('/delete/questions/ID', async (req, res) => {
  let data = await delete_questions_by_ID(req.body.ID);
  res.send(data);
});

// app.delete('/reset', async (req, res) => {
//   let data = await delete_All();
//   res.send(data);
// });

/**
 * patch routes
 */
app.patch('/submitQuiz', async (req, res) => {
  const teamID = req.body.teamID;
  const passed = req.body.passed;
  await update_answers(teamID, passed, res);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: false,
    enviroment: process.env.MODE,
    message:
      err.status === 403
        ? err.message
        : process.env.MODE === 'development'
        ? err.message
        : 'Error Occoured',
  });
});

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`port ${port}`));
});
