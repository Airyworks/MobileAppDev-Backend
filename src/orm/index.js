const Sequelize = require('sequelize')
const config = require('../../config.json').database
const defination = require('./model')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: false,
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: config.timezone
  }
)

const model = defination(sequelize)

module.exports = {
  model,
  sequelize
}
