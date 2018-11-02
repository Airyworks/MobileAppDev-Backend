const { randomStr, md5, getSession, setSession } = require('./helper')
module.exports = async (ctx, next) => {
  const body = ctx.request.body
  if (!body.name || !body.pwd) {
    ctx.response.status = 400
    return
  } else { 
    const { name, pwd } = body

    // Just use MD5, easy to CRACK by rainbow table

    const user = await ctx.orm.user.findOne({
      where: { name, pwd: md5(pwd) }
    })
    if (!user) {
      ctx.response.status = 404
      return
    }
    
    const key = randomStr()
    setSession(key, user)
    ctx.session.user = {
      key
    }

    const token = randomStr()
    const expireTime = new Date(new Date().getTime() + 3600 * 1000)
    await user.update({ token, expire_at: expireTime })

    ctx.response.body = {
      id: user.id,
      token,
      expireTime
    }
    await next()
  }
}