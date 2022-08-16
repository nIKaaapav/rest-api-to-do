const Sequelize = require('sequelize');

const DB_NAME = 'todo-app';
const USER_NAME = 'postgres';
const USER_PASSWORD = 'pg123456';

const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize;