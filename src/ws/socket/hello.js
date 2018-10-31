const Op = require('sequelize').Op

module.exports = async (soc, msg) => {
  if (!msg.token) {
    soc.disconnect(true)
    throw new Error(`Hello action missing given token`)
  }

  const user = await soc.orm.user.findOne({
    where: {
      token: msg.token,
      expire_at: {
        [Op.lte]: new Date()
      }
    }
  })
  if (!user) {
    soc.disconnect(true)
    throw new Error(`Error or expired token`)
  }
  soc.user = user

  soc.emit('hi', {})

  // TODO: check new msgs?
  // TODO: join rooms
}