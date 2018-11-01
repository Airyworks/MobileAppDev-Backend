const Koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const config = require('../../config.json').httpServ
const router = require('./router')
const { model, sequelize } = require('../orm')

const app = new Koa()

app.keys = config.cookieKeys
app.use(bodyParser())
app.use(session(app))
app.use(async (ctx, next) => {
  ctx.orm = model
  ctx.sequelize = sequelize
  await next()
})
app.use(router.routes())

app.listen(config.port)