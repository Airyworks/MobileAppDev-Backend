const { getUser } = require('./helper')
module.exports = async (soc, { joiners, channel }) => {
  if (!getUser(soc)) {
    return
  }

  const user = getUser(soc)
  if (joiners.includes(user.id)) {
    soc.join(channel)
  }
}