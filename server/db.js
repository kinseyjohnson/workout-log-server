const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:hellokinsey@localhost:5432/workout-log-server");

module.exports = sequelize;