const childProcess = require('child_process')
const { log, warn, error } = console

const httpServ = childProcess.fork('./src/http/')
log(`[info] HTTP server starts`)
const wsServ = childProcess.fork('./src/ws/')
log(`[info] Websocket server starts`)

[httpServ, wsServ].map(i => {
  i.on('error', err => error)
})
