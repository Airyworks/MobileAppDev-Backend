const Koa = require('koa')
const session = require('koa-session')
const router = require('./router')
const { model } = require('../orm')

const app = new Koa()

app.use(session(app))
app.use(async (ctx, next) => {
  ctx.orm = model
  await next()
})
app.use(router.routes())

app.listen(3000)