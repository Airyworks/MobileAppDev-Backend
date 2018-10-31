const Sequelize = require('sequelize')

module.exports = function (seq) {
  return seq.define('channel', {
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    user: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  }, {
    'timestamps': false,
    "createdAt":false,
    "updatedAt":false,
    "deletedAt":false,
  })
}
