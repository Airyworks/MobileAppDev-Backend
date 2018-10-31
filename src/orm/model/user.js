const Sequelize = require('sequelize')

module.exports = function (seq) {
  return seq.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    expire_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    'timestamps': false,
    "createdAt":false,
    "updatedAt":false,
    "deletedAt":false,
  })
}