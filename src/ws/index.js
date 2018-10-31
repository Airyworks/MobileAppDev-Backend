const Server = require('socket.io')
const socket = require('./socket')
const sequelize = require('../orm')

const { log, warn, error } = console
const io = new Server(3001)

io.on('connection', soc => {
  soc.orm = sequelize
  soc.on('msg', data => {
    socket(soc, data).catch(err => error(err))
  })
})
