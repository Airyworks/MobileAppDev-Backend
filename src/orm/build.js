const { model } = require('./index')

model.channel.sync({force: true})
model.friend.sync({force: true})
model.user.sync({force: true})
model.message.sync({force: true})
model.read.sync({force: true})
