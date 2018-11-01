const Op = require('sequelize').Op

module.exports = async (soc, msg) => {
  if (!msg.token) {
    soc.emit('invalid-param', {})
    throw new Error(`Hello action missing given token`)
  }

  const user = await soc.orm.user.findOne({
    where: {
      token: msg.token,
      expire_at: {
        [Op.gte]: new Date()
      }
    }
  })
  if (!user) {
    soc.emit('token-missing', {})
    throw new Error(`Error or expired token`)
  }
  soc.user = user
  soc.join(`user.${user.id}`)

  soc.emit('hi', {
    id: user.id,
    name: user.name,
    avatar: user.avatar
  })

  // auto join rooms
  const channels = await soc.orm.channel.findAll({
    where: {
      user: user.id
    }
  })
  channels.map(i => {
    soc.join(i.name)
  })

  // check whether there are new msgs?
  const unread = await soc.orm.unread.findAll({
    where: {
      is_read: 0,
      receiver: user.id
    },
    include: {
      model: soc.orm.message,
      include: {
        model: soc.orm.user
      }
    }
  })

  const unreadMsg = unread.map(i => {
    const sender = {
      id: i.message.user.id,
      name: i.message.user.name,
      avatar: i.message.user.avatar,
    }
    return {
      content: i.message.content,
      msgId: i.message.id,
      channel: i.message.channel,
      time: i.message.create_at,
      uuids: [ {
        uuid: i.id,
        user:user.id
      } ],
      sender
    }
  })

  if (unreadMsg.length > 0) {
    soc.emit('pull-message', { messages: unreadMsg }) 
  }
}