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
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

User.readOne = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({where: {username: username}});
    if (user == null) res.send({ message: 'user doesnt exit'});
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

/*User.createUser = async (req, res) => {
  try {
    const user = await User.create({
      username = req.body.username,
      password = req.body.password
    })
    res.status(201).json({
      createdUser: user
    });
  } catch(e) {
    return res.send(error);
  }
};*/

module.exports = User;