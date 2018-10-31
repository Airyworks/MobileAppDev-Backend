const hello = require('./hello')
const newChat = require('./newChat')
const pullMsg = require('./pullMsg')
const pushMsg = require('./pushMsg')

module.exports = async (soc, data) => {
  const parsed = JSON.parse(data)
  if (!parsed.action ||!parsed.msg) {
    throw new Error(`Json parse failed: ${data}`)
  }

  soc.user = null

  const { action, msg } = parsed
  switch (action) {
    case 'hello':
      return await hello(soc, msg)
    case 'new-chat':
      return await newChat(soc, msg)
    case 'pull-message':
      return await pullMsg(soc, msg)
    case 'push-message':
      return await pushMsg(soc, msg)
    default:
      throw new Error(`Undefined action: ${action}`)
  }
}