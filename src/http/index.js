const Koa = require('koa')
const session = require('koa-session')
const router = require('./router')
const sequelize = require('../orm')

const app = new Koa()

app.use(session(app))
app.use(async (ctx, next) => {
  ctx.orm = sequelize
  await next()
})
app.use(router.routes())

app.listen(3000)