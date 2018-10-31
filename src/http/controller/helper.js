const crypto = require('crypto')
const randomstring = require("randomstring")
const sessions = {}
const exp = {
  randomStr () {
    return randomstring.generate({
      length: 16,
      charset: '0123456789ABCDEF'
    })
  },
  md5 (str) {
    const hash = crypto.createHash('md5')
    return hash.update(str).digest('hex')
  },
  getSession (key) {
    return sessions[key]
  },
  setSession (key, val) {
    if (val === null) {
      delete sessions[key]
    } else {
      sessions[key] = val
    }
  },
  getUser (ctx) {
    if (ctx.session.user && ctx.session.user.key) {
      return sessions[ctx.session.user.key]
    } else {
      return undefined
    }
  }
}
module.exports = exp
