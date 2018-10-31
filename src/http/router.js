const Router = require('koa-router')
const { login, logout, friends } = require('./controller')

const router = new Router()

router.post('/login', async(ctx, next) => {
  await login(ctx, next)
})

router.post('/logout', async(ctx, next) => {
  await logout(ctx, next)
})

router.get('/friends', async(ctx, next) => {
  await friends(ctx, next)
})

module.exports = router
