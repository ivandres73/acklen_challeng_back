const Sequelize = require('sequelize');
const database = require('./Database');

var count = 1;

const Head = database.define(
  'heads',
  {
    head_id: { type: Sequelize.INTEGER, primaryKey: true},
    element: Sequelize.STRING,
    sex: Sequelize.CHAR,
    image: Sequelize.TEXT
  },
  { timestamps: false }
);

Head.readAll = async (req, res) => {
  try {
    const heads = await Head.findAll();
    res.send(heads);
  } catch (error) {
    res.send(error);
  }
};

Head.getNextImgUrl = async (req, res) => {
  if (count >= 7)
    count = 1;
  try {
    const head = await Head.findOne({where: {head_id: count++}});;
    if (head == null)
      return res.send({ message: 'head not found' });
    res.send(head.image);
  } catch (error) {
    res.send(error);
  }
};

Head.getPrevImgUrl = async (req, res) => {
  count -= 2;
  if (count <= 0)
    count = 6;
  try {
    const head = await Head.findOne({where: {head_id: count++}});;
    if (head == null)
      return res.send({ message: 'head not found' });
    res.send(head.image);
  } catch (error) {
    res.send(error);
  }
};