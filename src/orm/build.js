const { model } = require('./index')

model.user.sync({force: true})
model.message.sync({force: true})
model.channel.sync({force: true})
model.friend.sync({force: true})
model.unread.sync({force: true})
