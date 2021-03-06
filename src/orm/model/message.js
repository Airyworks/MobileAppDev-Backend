const Sequelize = require('sequelize')

module.exports = function (seq) {
  return seq.define('message', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    sender: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    channel: {
      type: Sequelize.STRING,
      allowNull: false
    },
    create_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    'timestamps': false,
    'createdAt':false,
    'updatedAt':false,
    'deletedAt':false,
  })
}
