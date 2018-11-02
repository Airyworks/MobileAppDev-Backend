const { getUser } = require('./helper')
const Op = require('sequelize').Op

module.exports = async (ctx, next) => {
  const user = getUser(ctx)
  if (!user) {
    ctx.response.status = 403
    return
  } else {
    // const friends = await user.getFriends()
    const channels = await ctx.orm.channel.findAll({
      where: {
        user: user.id
      },
      group: 'name'
    })
    const channelNames = channels.map(i => `'${i.name}'`)
    if (!Array.isArray(channelNames) || channelNames.length === 0) {
      ctx.response.body = []
      await next()
      return
    }

    // notice SQL rejection
    const peopleQuery = await ctx.sequelize.query(
      `select 
        channels.name as channel,
        users.name as name,
        users.id as id,
        users.avatar as avatar
        from channels join users
          on users.id = channels.user
        where channels.name in (${channelNames.join(',')})`
    )
    if (!Array.isArray(peopleQuery) || peopleQuery.length === 0) {
      ctx.response.body = []
      await next()
      return
    }
    
    const returned = []
    peopleQuery[0].forEach(i => {
      const ch = returned.find(v => v.name === i.channel)
      if (ch) {
        if (ch.users.find(t => t.id === i.id)) {
          return
        }
        ch.users.push({
          id: i.id,
          name: i.name,
          avatar: i.avatar
        })
      } else {
        returned.push({
          name: i.channel,
          users: [ {
              id: i.id,
              name: i.name,
              avatar: i.avatar
            } ]
        })
      }
    })
    ctx.response.body = returned
    await next()
  }
}