module.exports = async (soc, {msgId, channel, content, uuids, time, sender}) => {
  if (!getUser(soc)) {
    soc.emit('forbidden', {})
    return
  }

  const user = getUser(soc)
  const uuid = uuids.find(i => i.user === user.id)
  if (!uuid) {
    return
  }
  soc.emit('pull-message', {
    messages: [
      {
        uuid: uuid.uuid,
        msgId,
        sender,
        channel,
        content,
        time
      }
    ]
  })
}