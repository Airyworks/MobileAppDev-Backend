const hello = require('./hello')
const newChat = require('./newChat')
const clientRcv = require('./clientRcv')
const pushMsg = require('./pushMsg')

const { error } = console
const wrap = soc => func => {
  return data => { func(soc, data).catch(err => error(err)) }
}

module.exports = (soc) => {
  soc.on('hello', wrap(soc)(hello))
  soc.on('new-chat', wrap(soc)(newChat))
  soc.on('client-received', wrap(soc)(clientRcv))
  soc.on('push-message', wrap(soc)(pushMsg))
}