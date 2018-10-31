const Sequelize = require('sequelize')

module.exports = function (seq) {
  return seq.define('message', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: Sequelize.STRING
    },
    sender: {
      type: Sequelize.INTEGER
    },
    channel: {
      type: Sequelize.STRING
    },
    receiver: {
      type: Sequelize.INTEGER
    },
    is_read: {
      type: Sequelize.BOOLEAN
    },
    create_at: {
      type: Sequelize.DATE
    },
    msg_id: {
      type: Sequelize.INTEGER
    }
  }, {
    'timestamps': false,
    "createdAt":false,
    "updatedAt":false,
    "deletedAt":false,
  })
}
