const Op = require('sequelize').Op
const { getUser } = require('./helper')

module.exports = async (soc, msg) => {
  if (!getUser(soc)) {
    soc.emit('forbidden', {})
    return
  }

  if (!msg.uuids || !Array.isArray(msg.uuids)) {
    soc.emit('invalid-param', {})
    return
  }

  const user = getUser(soc)
  await soc.orm.unread.update({ is_read: 1 }, {
    where: {
      'id': {
        [Op.in]: msg.uuids
      },
      'receiver': user.id
    }
  })
}