const Sequelize = require('sequelize');
const database = require('./Database');

var count = 1;

const Body = database.define(
  'bodies',
  {
    body_id: { type: Sequelize.INTEGER, primaryKey: true},
    element: Sequelize.STRING,
    sex: Sequelize.CHAR,
    image: Sequelize.TEXT
  },
  { timestamps: false }
);

Body.readAll = async (req, res) => {
  try {
    const bodies = await Body.findAll();
    res.send(bodies);
  } catch (error) {
    res.send(error);
  }
};

Body.getNextImgUrl = async (req, res) => {
  if (count > 3)
    count = 1;
  try {
    const body = await Body.findOne({where: {body_id: count++}});;
    if (body == null)
      return res.send({ message: 'body not found' });
    res.send(body.image);
  } catch (error) {
    res.send(error);
  }
};

Body.getPrevImgUrl = async (req, res) => {
  count -= 2;
  if (count < 1)
    count = 3;
  try {
    const body = await Body.findOne({where: {body_id: count++}});;
    if (body == null)
      return res.send({ message: 'body not found' });
    res.send(body.image);
  } catch (error) {
    res.send(error);
  }
};

module.exports = Body;