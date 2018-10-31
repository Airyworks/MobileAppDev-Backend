const Sequelize = require('sequelize')

module.exports = function (seq) {
  return seq.define('read', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    receiver: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    is_read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    msg_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    'timestamps': false,
    'createdAt':false,
    'updatedAt':false,
    'deletedAt':false,
  })
}
