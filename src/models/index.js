const Sequelize = require('sequelize')
const winston = require('winston')

const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_DATABASE = process.env.MYSQL_DATABASE
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD

const logger = winston.createLogger({
  level: 'debug',
  transports: [
   new winston.transports.File({ filename: 'sequelize.log' })
  ]
});

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect:'mysql',
  logging: msg => logger.log('debug', msg)
});


sequelize.sync({ alter: true })


module.exports = sequelize



