const { getUser, getRoom } = require('./helper')

module.exports = async (soc, msg) => {
  if (!msg.sequence || !msg.channel || !msg.content) {
    soc.emit('invalid-param', {})
    return
  }

  if (!getUser(soc)) {
    soc.emit('forbidden', {})
    return
  }

  const user = getUser(soc)
  const create_at = new Date()

  const room = getRoom(msg.channel)
  if (!room || !room.joiners.includes(user.id)) {
    soc.emit('no-access-channel', {})
    return
  }

  const message = await soc.orm.message.create({
    content: msg.content,
    sender: user.id,
    channel: msg.channel,
    create_at
  })

  soc.emit('server-received', {
    sequence: msg.sequence,
    time: create_at,
    msgId: message.id
  })

  soc.to(msg.channel).emit('sb-saying', {
    msgId: message.id,
    channel: msg.channel,
    content: msg.content,
    time: create_at,
    sender: {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    }
  })

  const bundleToRead = []
  room.joiners.forEach(i => {
    bundleToRead.push({
      receiver: id,
      is_read: i === user.id,
      msg_id: message.id
    })
  })
  await soc.orm.read.bulkCreate(bundleToRead)
}