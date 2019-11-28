const Sequelize = require('sequelize');
const database = require('./Database');

var count = 1;

const Legs = database.define(
  'legs',
  {
    legs_id: { type: Sequelize.INTEGER, primaryKey: true},
    element: Sequelize.STRING,
    sex: Sequelize.CHAR,
    image: Sequelize.TEXT
  },
  { timestamps: false }
);

Legs.readAll = async (req, res) => {
  try {
    const legs = await Legs.findAll();
    res.send(legs);
  } catch (error) {
    res.send(error);
  }
};

Legs.getNextImgUrl = async (req, res) => {
  if (count > 4)
    count = 1;
  try {
    const legs = await Legs.findOne({where: {legs_id: count++}});;
    if (legs == null)
      return res.send({ message: 'legs not found' });
    res.send(legs.image);
  } catch (error) {
    res.send(error);
  }
};

Legs.getPrevImgUrl = async (req, res) => {
  count -= 2;
  if (count < 1)
    count = 4;
  try {
    const legs = await Legs.findOne({where: {legs_id: count++}});;
    if (legs == null)
      return res.send({ message: 'legs not found' });
    res.send(legs.image);
  } catch (error) {
    res.send(error);
  }
};

module.exports = Legs;