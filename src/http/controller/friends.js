const { getUser } = require('./helper')

module.exports = async (ctx, next) => {
  const user = getUser(ctx)
  if (!user) {
    ctx.response.status = 403
    return
  } else {
    const friends = await user.getFriends()
    ctx.response.body = friends.map(
      i => ({
        id: i.id,
        name: i.name,
        avatar: i.avatar
      })
    )
    await next()
  }
}