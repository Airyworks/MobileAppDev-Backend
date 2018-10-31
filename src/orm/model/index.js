module.exports = function (seq) {
  const channel = require('./channel')(seq)
  const message = require('./message')(seq)
  const friend = require('./friend')(seq)
  const user = require('./user')(seq)
  const read = require('./read')(seq)

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
  user.hasMany(read, {
    foreignKey: 'receiver'
  })
  message.hasMany(read, {
    foreignKey: 'msg_id'
  })

  return { channel, message, read, friend, user }
}