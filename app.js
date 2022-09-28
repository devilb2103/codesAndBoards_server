const express = require('express');
const cors = require('cors');
const passport = require('passport');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const { sequelize } = require("./Database/setup");
const { sequelize } = require('./Database/setup');
const { generateQuestions } = require('./Utils/questionGenerator');
const {
  select_members,
  select_questions,
  select_api_keys,
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

dotenv.config();

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/q', async (req, res) => {
  const x = await create_Members(req.body.names);
  // const x = await select_api_keys();
  // await create_SampleQuestions(10);
  res.send(x);
});

app.get('/members', async (req, res) => {
  let data = await select_api_keys();
  res.send(data);
});

app.get('/resetMembers', async (req, res) => {
  await deleteMembers();
  res.send('deleted all members');
});

app.get('/reset', async (req, res) => {
  await delete_All();
  res.send('all tables reset');
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
