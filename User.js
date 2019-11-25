const Sequelize = require('sequelize');
const database = require('./Database');

const User = database.define(
  'users',
  {
    user_id: { type: Sequelize.INTEGER, primaryKey: true},
    username: Sequelize.STRING,
    password: Sequelize.STRING
  },
  { timestamps: false }
);

User.readAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.send({ users });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = User;