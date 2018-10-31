const Sequelize = require('sequelize')

module.exports = function (seq) {
  return seq.define('friend', {
    user: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    friend: {
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
