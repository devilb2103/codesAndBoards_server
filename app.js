const express = require('express');
const cors = require('cors');
const passport = require('passport');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const { sequelize } = require("./Database/setup");
const { sequelize } = require('./Database/setup');
const {
  showMemberTable,
  removeAllFromTable,
  AddQuestions,
  showQuizTable,
  showQuestionTable,
  resetDB,
} = require('./Database/databaseFunctions');
const { member } = require('./Models/member');

dotenv.config();

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/generateQuestions', async (req, res) => {
  let data = await AddQuestions(req.body.count);
  res.send(data);
});

app.get('/questions', async (req, res) => {
  let data = await showQuestionTable();
  res.send(data);
});

app.get('/members', async (req, res) => {
  let data = await showMemberTable();
  res.send(data);
});

app.get('/resetValues', async (req, res) => {
  await removeAllFromTable();
  res.send('removed everything');
});

app.get('/reset', async (req, res) => {
  const x = await resetDB();
  res.send(x);
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
