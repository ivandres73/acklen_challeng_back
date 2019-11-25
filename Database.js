const Sequelize = require('sequelize');
require('dotenv').config();

//dotenv variables
const PG_HOST = process.env.REACT_APP_PG_HOST;
const PG_DB_NAME = process.env.REACT_APP_PG_DB_NAME;
const PG_PORT = process.env.REACT_APP_PG_PORT;
const PG_USER = process.env.REACT_APP_PG_USER;
const PG_PASS = process.env.REACT_APP_PG_PASS;

//string syntax = 'postgres://[db-user]:[password]@[db-host]:[db-port]/[db-name]';
DATABASE_URL = 'postgres://' + PG_USER + ':' + PG_PASS + '@' + PG_HOST + ':' + PG_PORT + '/' + PG_DB_NAME;
console.log(DATABASE_URL);

const database = new Sequelize(DATABASE_URL);

module.exports = database;