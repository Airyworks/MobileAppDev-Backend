const { getUser, getRoomByJoiners, addRoom }
  = require('./helper')

module.exports = async (soc, msg) => {
  if (!msg.to || !Array.isArray(msg.to)) {
    soc.emit('invalid-param', {})
    return
  }

  if (!getUser(soc)) {
    soc.emit('forbidden', {})
    return
  }

  const user = getUser(soc)
  const others = msg.to.map(i => i.id)
  const joiners = others.concat([user.id])
  const room = getRoomByJoiners(joiners)
  if (!room) {
    const channel = addRoom(joiners)

    // save new channel to db
    await soc.orm.channel.bulkCreate(joiners.map(
      i => ({ user: i, name: channel })
    ))

    soc.join(channel)
    soc.emit('new-chat-res', { channel })
    
    others.forEach(i => {
      soc.to(`user.${i}`).join(channel)
    })
  } else {
    const channel = room
    soc.join(channel)
    soc.emit('new-chat-res', { channel: channel.id })
  }
}