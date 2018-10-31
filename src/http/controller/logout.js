const { getUser, setSession } = require('./helper')
module.exports = async (ctx, next) => {
  if (!getUser(ctx)) {
    ctx.response.status = 403
    return
  }
  const user = getUser(ctx)
  await user.update({ token: null, expire_at: null })
  setSession(ctx.session.user.key, null)
  delete ctx.session['user']

  ctx.response.status = 204
  await next()
}