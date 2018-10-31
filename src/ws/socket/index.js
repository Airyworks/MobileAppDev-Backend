const hello = require('./hello')
const newChat = require('./newChat')
const clientRcv = require('./clientRcv')
const pushMsg = require('./pushMsg')
const newRoomBuilt = require('./newRoomBuilt')
const sbSaying = require('./sbSaying')

const { error } = console
const wrap = soc => func => {
  return data => { func(soc, data).catch(err => error) }
}

module.exports = (soc) => {
  soc.on('hello', wrap(soc)(hello))
  soc.on('new-chat', wrap(soc)(newChat))
  soc.on('client-received', wrap(soc)(clientRcv))
  soc.on('push-message', wrap(soc)(pushMsg))
  soc.on('new-room-built', wrap(soc)(newRoomBuilt))
  soc.on('sb-saying', wrap(soc)(sbSaying))
}