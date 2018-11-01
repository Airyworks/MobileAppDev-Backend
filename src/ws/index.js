const Server = require('socket.io')
const config = require('../../config.json').wsServ
const socket = require('./socket')
const { model } = require('../orm')

const io = new Server(config.port, {
  transports: ['websocket']
})

io.on('connection', soc => {
  soc.orm = model
  socket(soc)
})
