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
        [Op.lte]: new Date()
      }
    }
  })
  if (!user) {
    soc.emit('token-missing', {})
    throw new Error(`Error or expired token`)
  }
  soc.user = user

  soc.emit('hi', {})

  // auto join rooms
  const channels = await ctx.orm.channel.findAll({
    where: {
      user: user.id
    }
  })
  channels.map(i => {
    soc.join(i.name)
  })

  // check whether there are new msgs?
  const unread = await ctx.orm.unread.findAll({
    where: {
      is_read: 0,
      receiver: 3
    },
    include: {
      model: ctx.orm.message,
      include: {
        model: ctx.orm.user
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
      uuid: i.id,
      sender
    }
  })
  soc.emit('pull-message', { messages: unreadMsg }) 
}