module.exports = function (seq) {
  const channel = require('./channel')(seq)
  const message = require('./message')(seq)
  const friend = require('./friend')(seq)
  const user = require('./user')(seq)
  const unread = require('./unread')(seq)

  // Many to Many defination
  user.belongsToMany(user, {
    as: 'friends',
    through: friend,
    foreignKey: 'user',
    otherKey: 'friend'
  })

  // One to Many defination
  user.hasMany(message, {
    foreignKey: 'sender'
  })
  message.belongsTo(user, {
    foreignKey: 'sender'
  })
  user.hasMany(unread, {
    foreignKey: 'receiver'
  })
  unread.belongsTo(user, {
    foreignKey: 'receiver'
  })
  message.hasMany(unread, {
    foreignKey: 'msg_id'
  })
  unread.belongsTo(message, {
    foreignKey: 'msg_id'
  })

  return { channel, message, unread, friend, user }
}