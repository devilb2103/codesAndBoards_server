const { sequelize } = require('./setup');

async function resetDB() {
  await sequelize.drop();
  return 'dropped all tables';
}

async function deleteAll() {
  await api_key.destroy({ truncate: true });
  await member.destroy({ truncate: true });
  await question.destroy({ truncate: true });
  await quiz.destroy({ truncate: true });
}

module.exports = {
  resetDB: resetDB,
  deleteAll: deleteAll,
};
