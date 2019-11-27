const Sequelize = require('sequelize');
const database = require('./Database');

const User = database.define(
  'users',
  {
    //user_id: { type: Sequelize.INTEGER, primaryKey: true, defaultValue: '', allowNull: false},
    username: { type: Sequelize.STRING, primaryKey: true, allowNull: false},
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
    if (user == null)
      return res.status(404).send({ message: 'user doesnt exit' });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

User.createUser = async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  const user = await User.findOne({where: {username: req.body.username}});
  if (user != null)
    return res.send({ message: 'user already exist' });
  try {
    const user = await User.create({
      username : req.body.username,
      password : req.body.password
    });
    res.status(201).json({
      createdUser: user
    });
  } catch(error) {
    res.send(error);
  }
};

User.logIn = async (req, res) => {
  const user = await User.findOne({where: {username: req.body.username}});
  if (user == null)
    return res.send({ message: 'user doesnt exist' });
  try {
    if (user.password != req.body.password)
      return res.send({ message: 'password is incorrect' });
    res.status(201).json({
      login: 'OK'
    });
  } catch(error) {
    res.send(error);
  }
};

module.exports = User;